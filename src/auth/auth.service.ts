import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
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

  async validateToken(payload) {
    const { _id, email } = payload as { _id: string; email: string };
    const user = await this.repository.getUser({ _id, email });
    return user;
  }

  async validateUser(email: string, password: string) {
    const exception = new HttpException(
      {
        status: "failed",
        message: "Invalid email or password",
      },
      HttpStatus.UNAUTHORIZED
    );
    const user = await this.repository.getUser({ email });
    if (!user) {
      throw exception;
    }
    const hash = bcrypt.hashSync(password, user.salt);
    if (hash !== user.password) {
      throw exception;
    }
    return user;
  }

  async login(data: LoginDto) {
    const { email, password } = data;
    const user = await this.validateUser(email, password);
    return {
      status: "success",
      message: "You're Logged In",
      data: {
        access_token: this.jwtService.sign(
          { _id: user._id, email: user.email },
          {
            secret: this.configService.get<string>("JWT_SECRET"),
          }
        ),
      },
    };
  }
}
