import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { RepositoryModule } from "../repository/repository.module";
import { PrincipalGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    ConfigModule,
    RepositoryModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  providers: [PrincipalGuard, AuthService, LocalStrategy, JwtStrategy],
  exports: [PrincipalGuard, AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
