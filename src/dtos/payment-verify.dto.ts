import { IsOptional, IsString } from "class-validator";

export class PaymentVerifyDto {
  @IsString()
  @IsOptional()
  refund: string;

  @IsString()
  @IsOptional()
  payment: string;

  id?: string;
}
