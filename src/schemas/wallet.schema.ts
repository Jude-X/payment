import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "./user.schema";

export type WalletDocument = Wallet & Document;

//Giving another name
@Schema({ collection: "judex_wallet" })
export class Wallet {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  owner: string;

  @Prop({
    type: Number,
    default: 0,
  })
  amount: number;

  @Prop({
    type: String,
    required: true,
    enum: ["USD", "NGN"],
  })
  currency: string;

  @Prop({
    type: Number,
    required: true,
  })
  dailyLimit: number;

  @Prop({
    type: Number,
    required: true,
  })
  currentLimit: number;

  @Prop({
    type: Number,
    required: true,
  })
  lastUpdated: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
