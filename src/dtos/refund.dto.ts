import { IsDefined, IsNumber, IsString } from "class-validator";

export class RefundDto {
  @IsNumber()
  @IsDefined()
  amount: number;

  @IsString()
  @IsDefined()
  payment: string;
}
