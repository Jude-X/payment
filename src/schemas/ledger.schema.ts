import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Payment } from "./payment.schema";

export type LedgerDocument = Ledger & Document;

@Schema()
export class Ledger {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  })
  payment: Payment;

  @Prop({
    type: Number,
    required: true,
  })
  oldBalance: string;

  @Prop({
    type: Number,
    require: true,
  })
  newBalance: string;
}

export const LedgerSchema = SchemaFactory.createForClass(Ledger);
