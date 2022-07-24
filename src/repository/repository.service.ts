import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LedgerDocument } from "src/schemas/ledger.schema";
import { PaymentDocument } from "src/schemas/payment.schema";
import { UserDocument } from "src/schemas/user.schema";
import { WalletDocument } from "src/schemas/wallet.schema";

@Injectable()
export class RepositoryService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<UserDocument>,
    @InjectModel("Wallet") private readonly walletModel: Model<WalletDocument>,
    @InjectModel("Payment")
    private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel("Ledger") private readonly ledgerModel: Model<LedgerDocument>
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
