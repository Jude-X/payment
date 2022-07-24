import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class PaymentDto {
  @IsNumber()
  @IsDefined()
  amount: number;

  @IsEnum(["USD", "NGN"])
  @IsDefined()
  currency: string;

  @IsString()
  @IsDefined()
  wallet_to_debit: string;

  @IsString()
  @IsDefined()
  wallet_to_credit: string;

  @IsOptional()
  metadata: any;
}
