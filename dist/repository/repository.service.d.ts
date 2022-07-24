import { Model } from "mongoose";
import { LedgerDocument } from "src/schemas/ledger.schema";
import { PaymentDocument } from "src/schemas/payment.schema";
import { UserDocument } from "src/schemas/user.schema";
import { WalletDocument } from "src/schemas/wallet.schema";
export declare class RepositoryService {
    private readonly userModel;
    private readonly walletModel;
    private readonly paymentModel;
    private readonly ledgerModel;
    constructor(userModel: Model<UserDocument>, walletModel: Model<WalletDocument>, paymentModel: Model<PaymentDocument>, ledgerModel: Model<LedgerDocument>);
    createUser(data: any): Promise<import("src/schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getUser(data: any): Promise<import("src/schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createWallet(data: any): Promise<import("src/schemas/wallet.schema").Wallet & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getWallet(id: string): Promise<import("src/schemas/wallet.schema").Wallet & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createPayment(data: any): Promise<import("src/schemas/payment.schema").Payment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getPayment(id: string): Promise<import("src/schemas/payment.schema").Payment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    createLedger(data: any): Promise<import("src/schemas/ledger.schema").Ledger & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    getLedger(id: string): Promise<import("src/schemas/ledger.schema").Ledger & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
