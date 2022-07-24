import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { RepositoryService } from "../repository/repository.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class PrincipalGuard {
  constructor(
    private repository: RepositoryService,
    private jwtService: JwtService
  ) {}

  // canActivate(
  //   context: ExecutionContext
  // ): string | Promise<string> | Observable<string> {
  //   const executionContextType = context.getType();
  //   if (executionContextType === "http") {
  //     const request: Request = context.switchToHttp().getRequest();
  //     const token = request.headers["token"];
  //     const payload = this.jwtService.decode(token);
  //     return payload.userId;
  //   }else{
  //     return
  //   }
  //   return "";
  // }
}
