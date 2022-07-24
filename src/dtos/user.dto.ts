import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class UserDto {
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  metadata?: any;

  wallet?: string;

  salt?: string;
}
