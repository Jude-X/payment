import mongoose, { Document } from "mongoose";
import { Payment } from "./payment.schema";
export declare type LedgerDocument = Ledger & Document;
export declare class Ledger {
    payment: Payment;
    oldBalance: string;
    newBalance: string;
}
export declare const LedgerSchema: mongoose.Schema<Ledger, mongoose.Model<Ledger, any, any, any, any>, {}, {}, any, {}, "type", Ledger>;
