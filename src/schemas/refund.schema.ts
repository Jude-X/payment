import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type RefundDocument = Refund & Document;

//Giving another name
@Schema({ collection: "judex_refund" })
export class Refund {
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
    type: "string",
    ref: "Wallet",
    required: true,
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
    required: false,
  })
  payment: string;

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

export const RefundSchema = SchemaFactory.createForClass(Refund);
