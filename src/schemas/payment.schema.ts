import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type PaymentDocument = Payment & Document;

//Giving another name
@Schema({ collection: "judex_payment" })
export class Payment {
  @Prop({
    type: Number,
    required: true,
  })
  amount: number;

  @Prop({
    type: Date,
  })
  created_at: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: true,
  })
  credit_wallet: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
    required: false,
  })
  debit_wallet: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  })
  owner: string;

  @Prop({
    type: String,
    enum: ["USD", "NGN"],
    required: true,
  })
  currency: string;

  @Prop({
    type: String,
    enum: ["successful", "failed", "initiated"],
    default: "initiated",
  })
  status: string;

  @Prop({
    type: String,
    required: true,
  })
  ref: string;

  @Prop({
    type: mongoose.Types.Map,
  })
  metadata?: mongoose.Types.Map<any>;

  @Prop({
    type: String,
  })
  error_message: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
