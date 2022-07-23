import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "./user.schema";

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  })
  owner: User;

  @Prop({
    type: Number,
    required: true,
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
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
