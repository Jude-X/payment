import mongoose, { Document } from "mongoose";
import { Wallet } from "./wallet.schema";
export declare type PaymentDocument = Payment & Document;
export declare class Payment {
    wallet: Wallet;
    status: string;
    type: string;
}
export declare const PaymentSchema: mongoose.Schema<Payment, mongoose.Model<Payment, any, any, any, any>, {}, {}, any, {}, "type", Payment>;
