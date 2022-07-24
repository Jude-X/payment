import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type LedgerDocument = Ledger & Document;

//Giving another name
@Schema({ collection: "judex_ledger" })
export class Ledger {
  @Prop({
    type: String,
    required: true,
  })
  ref: string;

  @Prop({
    type: String,
    enum: ["funding", "payment", "refund"],
    required: true,
  })
  type: string;

  @Prop({
    type: Number,
    required: true,
  })
  oldBalance: number;

  @Prop({
    type: Number,
    required: true,
  })
  newBalance: number;

  @Prop({
    type: Number,
    required: true,
  })
  amount: number;
}

export const LedgerSchema = SchemaFactory.createForClass(Ledger);
