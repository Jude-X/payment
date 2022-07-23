import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { LedgerDocument } from "src/schemas/ledger.schema";
import { PaymentDocument } from "src/schemas/payment.schema";
import { UserDocument } from "src/schemas/user.schema";
import { WalletDocument } from "src/schemas/wallet.schema";

@Injectable()
export class RepositoryService {
  constructor(
    private userModel: Model<UserDocument>,
    private walletModel: Model<WalletDocument>,
    private paymentModel: Model<PaymentDocument>,
    private ledgerModel: Model<LedgerDocument>
  ) {}

  public async createUser(data) {
    return await this.userModel.create(data);
  }

  public async getUser(id: string) {
    return await this.userModel.findById(id);
  }

  public async createWallet(data) {
    return await this.walletModel.create(data);
  }

  public async getWallet(id: string) {
    return await this.walletModel.findById(id);
  }

  public async createPayment(data) {
    return await this.paymentModel.create(data);
  }

  public async getPayment(id: string) {
    return await this.paymentModel.findById(id);
  }

  public async createLedger(data) {
    return await this.ledgerModel.create(data);
  }

  public async getLedger(id: string) {
    return await this.ledgerModel.findById(id);
  }
}
