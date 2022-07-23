import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Wallet } from "./wallet.schema";

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
  })
  wallet: Wallet;

  @Prop({
    type: String,
    enum: ["successful", "failed", "pending"],
    default: "pending",
  })
  status: string;

  @Prop({
    enum: ["refund", "funding", "transfer"],
  })
  type: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
