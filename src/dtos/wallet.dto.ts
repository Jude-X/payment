import { IsDefined, IsEnum, IsNumber, IsString } from "class-validator";

export class WalletDto {
  @IsString()
  @IsDefined()
  owner: string;

  @IsNumber()
  @IsDefined()
  amount: number;

  @IsEnum(["USD", "NGN"])
  @IsDefined()
  currency: string;

  @IsNumber()
  @IsDefined()
  dailyLimit: number;
}
