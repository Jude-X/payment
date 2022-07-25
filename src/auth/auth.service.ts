import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RepositoryService } from "../repository/repository.service";
import { LoginDto } from "../dtos/login.dto";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private repository: RepositoryService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async validateUser(data: LoginDto) {
    const exception = new HttpException(
      {
        status: "failed",
        message: "Invalid email or password",
      },
      HttpStatus.UNAUTHORIZED
    );
    const user = await this.repository.getUser({ email: data.email });
    if (!user) {
      throw exception;
    }
    const hash = bcrypt.hashSync(data.password, user.salt);
    if (hash !== user.password) {
      return null;
    }
    return user;
  }

  async login(user: any) {
    const payload = { userId: user._id, email: user.email };
    return {
      status: "success",
      message: "You're Logged In",
      data: {
        access_token: this.jwtService.sign(payload, {
          secret: this.configService.get<string>("JWT_SECRET"),
        }),
      },
    };
  }
}
