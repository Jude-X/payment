import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

//Giving another name
@Schema({ collection: "judex_user" })
export class User {
  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop()
  wallet: string;

  @Prop({
    type: String,
    required: true,
  })
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
