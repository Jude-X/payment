import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { WalletDto, WalletFundDto } from "../dtos";
import { RepositoryService } from "../repository/repository.service";

@Injectable()
export class WalletService {
  constructor(private repository: RepositoryService) {}

  public async create(data: WalletDto) {
    // Asychronously handle multiple DB calls to improve speed
    const asyncDBOperations = [];

    //Confirm the owner is valid
    asyncDBOperations.push(
      this.repository.getUser({ _id: data.owner }).then((user) => {
        if (!user) {
          throw new HttpException(
            { status: "failed", message: "Owner Doesnt Exist" },
            HttpStatus.BAD_REQUEST
          );
        }
      })
    );

    //Check if user already has a wallet with that currency
    asyncDBOperations.push(
      this.repository
        .getWallet({ owner: data.owner, currency: data.currency })
        .then((wallet) => {
          if (wallet) {
            throw new HttpException(
              { status: "failed", message: "Wallet Already Exists" },
              HttpStatus.BAD_REQUEST
            );
          }
        })
    );
    await Promise.all(asyncDBOperations);
    data.currentLimit = data.dailyLimit;
    data.lastUpdated = new Date().getTime();
    const wallet = await this.repository.createWallet(data);
    return {
      status: "success",
      message: "Wallet successfully created",
      walletId: wallet._id,
    };
  }

  public async get(id?: string) {
    if (!id) {
      //Fetch All Wallets
      const wallets = await this.repository.getWallets();
      return {
        status: "success",
        message: "Wallets successfully fetched",
        data: wallets.map((wallet) => {
          return {
            id: wallet._id,
            owner: wallet.owner,
            amount: wallet.amount,
            currency: wallet.currency,
            dailyLimit: wallet.dailyLimit,
          };
        }),
      };
    }
    //Check if user exists
    const wallet = await this.repository.getWallet({ _id: id });
    if (!wallet) {
      throw new HttpException(
        { message: "Wallet Not Found" },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      status: "success",
      message: "Wallet successfully fetched",
      data: {
        id: wallet._id,
        owner: wallet.owner,
        amount: wallet.amount,
        currency: wallet.currency,
        dailyLimit: wallet.dailyLimit,
      },
    };
  }

  public async fund(data: WalletFundDto, userId) {
    //Check if the wallet exists
    const wallet = await this.repository.getWallet({ _id: data.wallet });
    if (!wallet) {
      throw new HttpException(
        { message: "Wallet Not Found" },
        HttpStatus.NOT_FOUND
      );
    }
    /**
     *  Race conditions are not handled in mongoDB.
     *  Ideally, The row or object is supposed to be locked,
     *  to avoid dirty reads from race conditions
     * */

    wallet.amount += data.amount;
    await wallet.save();

    //Create Funding Entry
    const funding = await this.repository.createPaymentSingle({
      amount: data.amount,
      created_at: new Date().toISOString(),
      credit_wallet: wallet._id,
      debit_wallet: "SYSTEM",
      owner: userId,
      currency: wallet.currency,
    });

    //Create Ledger Entry
    await this.repository.createLedger({
      ref: funding._id,
      type: "funding",
      oldBalance: wallet.amount - data.amount,
      newBalance: wallet.amount,
      amount: data.amount,
    });

    return {
      status: "success",
      message: "Wallet successfully funded",
      data: {
        id: wallet._id,
        amount: wallet.amount,
      },
    };
  }
}
