import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { RepositoryService } from "../repository/repository.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PaymentDto, RefundDto } from "../dtos";
import { PaymentVerifyDto } from "../dtos/payment-verify.dto";

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  constructor(private repository: RepositoryService) {}

  public async initiate(data: PaymentDto[], userId) {
    const request = await this.repository.bulkCreate({
      created_at: new Date().toISOString(),
      owner: userId,
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

  public async refund(data: RefundDto[], userId) {
    const request = await this.repository.bulkCreate({
      created_at: new Date().toISOString(),
      type: "refund",
      data,
      owner: userId,
    });

    return {
      status: "success",
      message: "Refund(s) successfully initiated, verify to continue",
      data: {
        request_id: request._id,
      },
    };
  }

  public async verify(data: PaymentVerifyDto) {
    let response;
    let errormessage: string;
    let message: string;
    if (data.refund) {
      response = await this.repository.getRefund({ _id: data.refund });
      errormessage = "Refund Not Found";
      message = "Refund(s) verified successfully";
    } else if (data.payment) {
      response = await this.repository.getPayment({ _id: data.payment });
      errormessage = "Payment Not Found";
      message = "Payment(s) verified successfully";
    } else {
      response = (await this.get(data.id)).data;
    }
    if (!response) {
      throw new HttpException({ message: errormessage }, HttpStatus.NOT_FOUND);
    }
    return {
      status: "success",
      message,
      data: response,
    };
  }

  public async verifyRequest(id: string) {
    const request = await this.repository.getBulk({ _id: id });
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
    if (!id || id == ":id") {
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

  //Run a cron job to process bulk payment every 30 seconds
  @Cron(CronExpression.EVERY_30_SECONDS)
  public async handlePayment() {
    let payment;
    const bulk = await this.repository.getNextBulkPayment();
    if (!bulk) {
      this.logger.debug(`No Payment Request ID initiated`);
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
              this.logger.debug(paymentPayload["error_message"]);
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
              this.logger.debug(paymentPayload["error_message"]);
            }
            return wallet;
          }),
      ]);

      if (!paymentPayload["error_message"]) {
        //check same currency
        if (
          wallets[0].currency === wallets[1].currency &&
          wallets[1].currency === paymentDto.currency
        ) {
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
              this.logger.debug(paymentPayload["error_message"]);
            } else if (wallets[0].amount - paymentDto.amount < 0) {
              //Check if the debtor has enough money
              paymentPayload["error_message"] =
                "Debtor has insufficient balance";
              this.logger.debug(paymentPayload["error_message"]);
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
        } else {
          paymentPayload["error_message"] = "Wallet Currency Discrepancy";
          this.logger.debug(paymentPayload["error_message"]);
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
        this.logger.debug(`Successfully Handled Payment ID - ${payment._id}`);
      }
    }

    this.logger.debug(`Successfully Handled Payment Request ID - ${bulk._id}`);
    bulk.status = "completed";
    await bulk.save();
  }

  // Run a cron job to process bulk refund every minute
  @Cron(CronExpression.EVERY_MINUTE)
  public async handleRefund() {
    let wallets;
    const bulk = await this.repository.getNextBulkRefund();
    if (!bulk) {
      this.logger.debug(`No Refund Request ID initiated`);
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
      } else if (payment.status != "successful") {
        // Payment wasnt successful
        refundPayload["error_message"] = "Payment Was Not Successful";
      } else if (payment.ref == "WALLET FUNDING") {
        // Cant refund wallet funding
        refundPayload["error_message"] = "Cant Refund Wallet Funding";
      } else {
        refundPayload["debit_wallet"] = payment.credit_wallet;
        refundPayload["credit_wallet"] = payment.debit_wallet;
        refundPayload["currency"] = payment.currency;
        //Asynchronously fetch wallets
        wallets = await Promise.all([
          this.repository
            .getWallet({
              _id: refundPayload["debit_wallet"],
            })
            .then((wallet) => {
              if (!wallet) {
                refundPayload["error_message"] = "Debtor Wallet Not Found";
                this.logger.debug(refundPayload["error_message"]);
              }
              return wallet;
            }),
          this.repository
            .getWallet({
              _id: refundPayload["credit_wallet"],
            })
            .then((wallet) => {
              if (!wallet) {
                refundPayload["error_message"] = "Creditor Wallet Not Found";
                this.logger.debug(refundPayload["error_message"]);
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
          refundPayload["payment"] = payment._id;
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
        this.logger.debug(`Successfully Handled Refund ID - ${refund._id}`);
      }
    }

    bulk.status = "completed";
    await bulk.save();
    this.logger.debug(`Successfully Handled Refund Request ID - ${bulk._id}`);
  }
}
