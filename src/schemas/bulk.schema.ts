import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { PaymentDto, RefundDto } from "src/dtos";
import { User } from "./user.schema";

export type BulkDocument = Bulk & Document;

//Giving another name
@Schema({ collection: "judex_bulk" })
export class Bulk {
  @Prop({
    type: String,
  })
  created_at: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  })
  owner: User;

  @Prop({
    type: String,
    enum: ["processing", "completed"],
    default: "processing",
  })
  status: string;

  @Prop({
    type: String,
    enum: ["refund", "payment"],
  })
  type: string;

  @Prop({
    type: Array,
    required: true,
  })
  data: Array<PaymentDto | RefundDto>;
}

export const BulkSchema = SchemaFactory.createForClass(Bulk);
