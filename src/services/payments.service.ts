import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { RepositoryService } from "../repository/repository.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PaymentDto, RefundDto } from "src/dtos";

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  constructor(private repository: RepositoryService) {}

  public async initiate(data: PaymentDto[]) {
    const request = await this.repository.bulkCreate({
      created_at: new Date().toISOString(),
      //owner: data.userId,
      type: "payment",
      data,
    });

    return {
      status: "success",
      message: "Payment(s) successfully initiated, verify to continue",
      data: {
        request_id: request._id,
      },
    };
  }

  public async refund(data) {
    const request = await this.repository.bulkCreate({
      created_at: new Date().toISOString(),
      type: "refunds",
      owner: data.userId,
    });

    return {
      status: "success",
      message: "Refund(s) successfully initiated, verify to continue",
      data: {
        request_id: request._id,
      },
    };
  }

  public async verify(data) {
    let _id = data.payment;
    if (data.refund) {
      _id = data.refund;
    }
    const payment = await this.repository.getPayment({ _id });
    if (!payment) {
      throw new HttpException(
        { message: "Payment Not Found" },
        HttpStatus.NOT_FOUND
      );
    }
    return {
      status: "success",
      message: "Payment successully fetched",
      data: {
        payment,
      },
    };
  }

  public async requestVerify(request_id: string) {
    const request = await this.repository.getBulk({ _id: request_id });
    if (!request) {
      throw new HttpException(
        { message: "Request Not Found" },
        HttpStatus.NOT_FOUND
      );
    }
    return {
      status: "success",
      message: "Request successully fetched",
      data: {
        request,
      },
    };
  }

  public async get(id?: string) {
    if (!id) {
      //Fetch All Payments
      const payments = await this.repository.getPayments();
      return {
        status: "success",
        message: "Payments successfully fetched",
        data: payments.map((payment) => {
          return {
            id: payment._id,
            amount: payment.amount,
            created_at: payment.created_at,
            credit_wallet: payment.credit_wallet,
            currency: payment.currency,
            debit_wallet: payment.debit_wallet,
            metadata: payment.metadata,
            owner: payment.owner,
            ref: payment.ref,
            status: payment.status,
            error_message: payment.error_message,
          };
        }),
      };
    }
    //Check if user exists
    const payment = await this.repository.getPayment({ _id: id });
    if (!payment) {
      throw new HttpException(
        { message: "Payment Not Found" },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      status: "success",
      message: "Payment successfully fetched",
      data: {
        id: payment._id,
        amount: payment.amount,
        created_at: payment.created_at,
        credit_wallet: payment.credit_wallet,
        currency: payment.currency,
        debit_wallet: payment.debit_wallet,
        metadata: payment.metadata,
        owner: payment.owner,
        ref: payment.ref,
        status: payment.status,
        error_message: payment.error_message,
      },
    };
  }

  // Run a cron job to process bulk payment every 60 seconds
  //@Cron(CronExpression.EVERY_MINUTE)
  public async handlePayment() {
    let payment;
    const bulk = await this.repository.getNextBulkPayment();
    if (!bulk) {
      this.logger.warn(`No Payment Request ID initiated`);
      return;
    }
    this.logger.debug(`Handling Payment Request ID - ${bulk._id}`);
    for (const dto of bulk.data) {
      const paymentDto = dto as PaymentDto;
      const paymentPayload = {
        amount: paymentDto.amount,
        created_at: new Date().toISOString(),
        credit_wallet: paymentDto.wallet_to_credit,
        currency: paymentDto.currency,
        debit_wallet: paymentDto.wallet_to_debit,
        owner: bulk.owner,
        ref: `PAYMENT FROM - ${bulk.owner}`,
        metadata: paymentDto.metadata,
        status: "failed",
      };
      //check debtor and creditor wallets
      //Asynchronously fetch wallets
      const wallets = await Promise.all([
        this.repository
          .getWallet({
            _id: paymentDto.wallet_to_debit,
          })
          .then((wallet) => {
            if (!wallet) {
              paymentPayload["error_message"] = "Debtor Wallet Not Found";
              this.logger.warn(paymentPayload["error_message"]);
            }
            return wallet;
          }),
        this.repository
          .getWallet({
            _id: paymentDto.wallet_to_credit,
          })
          .then((wallet) => {
            if (!wallet) {
              paymentPayload["error_message"] = "Creditor Wallet Not Found";
              this.logger.warn(paymentPayload["error_message"]);
            }
            return wallet;
          }),
      ]);

      if (!paymentPayload["error_message"]) {
        //check dailylimit of debtor using lastUpdated and currentLimit
        if (
          new Date().getTime() - wallets[0].lastUpdated >
          24 * 60 * 60 * 1000
        ) {
          // Reset his limit as it has been more than 24 hours
          wallets[0].lastUpdated = new Date().getTime();
          wallets[0].currentLimit = wallets[0].dailyLimit;
        } else {
          if (wallets[0].currentLimit - paymentDto.amount < 0) {
            // Check if his currentLimit allows him make the paymentPayload
            paymentPayload["error_message"] = "Debtor has reached limit";
            this.logger.warn(paymentPayload["error_message"]);
          } else if (wallets[0].amount - paymentDto.amount < 0) {
            //Check if the debtor has enough money
            paymentPayload["error_message"] = "Debtor has insufficient balance";
            this.logger.warn(paymentPayload["error_message"]);
          } else {
            //Reduce Current Limit
            wallets[0].currentLimit -= paymentDto.amount;
            //Make the payment
            //Reduce the amount of the debtor
            wallets[0].amount -= paymentDto.amount;
            //Increase the amount of the creditor
            wallets[1].amount += paymentDto.amount;

            //Asynchronously save both wallets
            await Promise.all([wallets[0].save(), wallets[1].save()]);
            paymentPayload["status"] = "successful";
          }
        }
      }

      //Create Payment or record error
      payment = await this.repository.createPaymentSingle(paymentPayload);
      //Create Ledger
      if (
        !paymentPayload["error_message"] &&
        paymentPayload["status"] == "successful"
      ) {
        //Create Ledger Entries
        await Promise.all([
          this.repository.createLedger({
            ref: payment._id,
            type: "payment",
            oldBalance: wallets[0].amount + paymentDto.amount,
            newBalance: wallets[0].amount,
            amount: paymentDto.amount,
          }),
          this.repository.createLedger({
            ref: payment._id,
            type: "payment",
            oldBalance: wallets[1].amount - paymentDto.amount,
            newBalance: wallets[1].amount,
            amount: paymentDto.amount,
          }),
        ]);
      }
      this.logger.debug(
        `Successfully Handled Payment Request ID - ${bulk._id}`
      );
    }
  }

  // Run a cron job to process bulk refund every 5 minutes
  @Cron(CronExpression.EVERY_5_MINUTES)
  public async handleRefund() {
    let wallets;
    const bulk = await this.repository.getNextBulkRefund();
    if (!bulk) {
      this.logger.warn(`No Refund Request ID initiated`);
      return;
    }
    this.logger.debug(`Handling Refund Request ID - ${bulk._id}`);
    for (const dto of bulk.data) {
      const refundDto = dto as RefundDto;
      const refundPayload = {
        amount: refundDto.amount,
        created_at: new Date().toISOString(),
        owner: bulk.owner,
        ref: `REFUND FOR PAYMENT WITH ID - ${refundDto.payment}`,
        status: "failed",
      };
      const payment = await this.repository.getPayment({
        _id: refundDto.payment,
      });
      if (!payment) {
        // No payment exists
        refundPayload["error_message"] = "Payment ID Not Found";
      } else {
        refundPayload["debit_wallet"] = payment.credit_wallet;
        refundPayload["credit_wallet"] = payment.debit_wallet;
        //Asynchronously fetch wallets
        wallets = await Promise.all([
          this.repository
            .getWallet({
              _id: refundPayload["debit_wallet"],
            })
            .then((wallet) => {
              if (!wallet) {
                refundPayload["error_message"] = "Debtor Wallet Not Found";
                this.logger.warn(refundPayload["error_message"]);
              }
              return wallet;
            }),
          this.repository
            .getWallet({
              _id: refundPayload["creditor_wallet"],
            })
            .then((wallet) => {
              if (!wallet) {
                refundPayload["error_message"] = "Creditor Wallet Not Found";
                this.logger.warn(refundPayload["error_message"]);
              }
              return wallet;
            }),
        ]);
        if (!refundPayload["error_message"]) {
          //Reduce the amount of the debtor
          wallets[0].amount -= refundDto.amount;
          //Increase the amount of the creditor
          wallets[1].amount += refundDto.amount;
          //Asynchronously save both wallets
          await Promise.all([wallets[0].save(), wallets[1].save()]);
          refundPayload["status"] = "successful";
        }
      }
      const refund = await this.repository.createRefund(refundPayload);
      if (!refund["error_message"]) {
        //Create Ledger Entries
        await Promise.all([
          this.repository.createLedger({
            ref: refund._id,
            type: "refund",
            oldBalance: wallets[0].amount + refundDto.amount,
            newBalance: wallets[0].amount,
            amount: refundDto.amount,
          }),
          this.repository.createLedger({
            ref: refund._id,
            type: "refund",
            oldBalance: wallets[1].amount - refundDto.amount,
            newBalance: wallets[1].amount,
            amount: refundDto.amount,
          }),
        ]);
        this.logger.debug(
          `Successfully Handled Refund Request ID - ${bulk._id}`
        );
      }
    }
  }
}
