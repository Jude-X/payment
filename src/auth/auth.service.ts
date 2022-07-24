import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RepositoryService } from "../repository/repository.service";

@Injectable()
export class AuthService {
  constructor(
    private repository: RepositoryService,
    private jwtService: JwtService
  ) {}

  async login(data) {
    const user = await this.repository.getUser({ email: data.email });
    if (!user) {
      throw new HttpException(
        {
          status: "failed",
          message: "User Not Found",
        },
        HttpStatus.NOT_FOUND
      );
    }
    const payload = { userId: user.id };
    return {
      status: "success",
      message: "You're Logged In",
      data: {
        access_token: this.jwtService.sign(payload),
      },
    };
  }

  async verify(data) {
    const user = await this.repository.getUser({ email: data.email });
    if (!user) {
      throw new HttpException(
        {
          status: "failed",
          message: "User Not Found",
        },
        HttpStatus.NOT_FOUND
      );
    }
    const payload = { userId: user.id };
    return {
      status: "success",
      message: "You're Logged In",
      data: {
        access_token: this.jwtService.sign(payload),
      },
    };
  }
}
