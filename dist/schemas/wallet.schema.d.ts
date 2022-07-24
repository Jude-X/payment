import mongoose, { Document } from "mongoose";
import { User } from "./user.schema";
export declare type WalletDocument = Wallet & Document;
export declare class Wallet {
    owner: User;
    amount: number;
    currency: string;
    dailyLimit: number;
}
export declare const WalletSchema: mongoose.Schema<Wallet, mongoose.Model<Wallet, any, any, any, any>, {}, {}, any, {}, "type", Wallet>;
