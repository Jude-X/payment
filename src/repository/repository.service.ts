import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { LedgerDocument } from "../schemas/ledger.schema";
import { PaymentDocument } from "../schemas/payment.schema";
import { BulkDocument } from "../schemas/bulk.schema";
import { UserDocument } from "../schemas/user.schema";
import { WalletDocument } from "../schemas/wallet.schema";
import { RefundDocument } from "../schemas/refund.schema";

@Injectable()
export class RepositoryService {
  constructor(
    @InjectModel("User") private readonly userModel: Model<UserDocument>,
    @InjectModel("Wallet") private readonly walletModel: Model<WalletDocument>,
    @InjectModel("Payment")
    private readonly paymentModel: Model<PaymentDocument>,
    @InjectModel("Ledger") private readonly ledgerModel: Model<LedgerDocument>,
    @InjectModel("Bulk")
    private readonly bulkModel: Model<BulkDocument>,
    @InjectModel("Refund")
    private readonly refundModel: Model<RefundDocument>
  ) {}

  public async createUser(data) {
    return this.userModel.create(data);
  }

  public async getUser(data: { _id?: string; email?: string }) {
    return this.userModel.findOne(data);
  }

  public async getUsers() {
    return this.userModel.find().exec();
  }

  public async createWallet(data) {
    return this.walletModel.create(data);
  }

  public async getWallet(data: {
    _id?: string;
    owner?: string;
    currency?: string;
  }) {
    return this.walletModel.findOne(data);
  }

  public async getWallets() {
    return this.walletModel.find().exec();
  }

  public async bulkCreate(data) {
    return this.bulkModel.create(data);
  }

  public async getBulk(data) {
    return this.bulkModel.findOne(data);
  }

  public async getNextBulkPayment() {
    return this.bulkModel.findOne({ status: "processing", type: "payment" });
  }

  public async getNextBulkRefund() {
    return this.bulkModel.findOne({ status: "processing", type: "refund" });
  }

  public async createPaymentSingle(data) {
    return this.paymentModel.create(data);
  }

  public async createPaymentBulk(data) {
    return this.paymentModel.bulkSave(data);
  }

  public async getPayment(data: { _id?: string }) {
    return this.paymentModel.findById(data);
  }

  public async getPayments() {
    return this.paymentModel.find().exec();
  }

  public async createLedger(data) {
    return this.ledgerModel.create(data);
  }

  public async getLedger(id: string) {
    return this.ledgerModel.findById(id);
  }

  public async createRefund(data) {
    return this.refundModel.create(data);
  }

  public async getRefund(data: { _id?: string }) {
    return this.refundModel.findById(data);
  }
}
