import { IsDefined, IsString } from "class-validator";

export class UserDto {
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  firstName: string;

  @IsString()
  @IsDefined()
  lastName: string;

  @IsString()
  @IsDefined()
  password: string;

  wallet?: string;
}
