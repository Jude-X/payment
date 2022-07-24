import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class WalletDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  owner: string;

  amount?: number;

  @IsEnum(["USD", "NGN"])
  @IsDefined()
  @IsNotEmpty()
  currency: string;

  @IsNumber()
  @IsDefined()
  @IsNotEmpty()
  dailyLimit: number;

  @IsOptional()
  metadata?: any;

  lastUpdated?: number;
  currentLimit?: number;
}

export class WalletFundDto {
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsDefined()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  wallet: string;
}
