import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { RepositoryModule } from "src/repository/repository.module";
import { PrincipalGuard } from "./auth.service";

@Module({
  imports: [ConfigModule, RepositoryModule, JwtModule],
  providers: [PrincipalGuard],
  exports: [PrincipalGuard],
})
export class AuthModule {}