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
    return this.userModel.create(data);
  }

  public async getUser(data) {
    return this.userModel.findOne(data);
  }

  public async createWallet(data) {
    return this.walletModel.create(data);
  }

  public async getWallet(id: string) {
    return this.walletModel.findById(id);
  }

  public async createPayment(data) {
    return this.paymentModel.create(data);
  }

  public async getPayment(id: string) {
    return this.paymentModel.findById(id);
  }

  public async createLedger(data) {
    return this.ledgerModel.create(data);
  }

  public async getLedger(id: string) {
    return this.ledgerModel.findById(id);
  }
}
