import { IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password: string;
}
