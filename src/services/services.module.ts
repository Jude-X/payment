import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { RepositoryModule } from "../repository/repository.module";
import { PaymentService } from "./payments.service";
import { UserService } from "./users.service";
import { WalletService } from "./wallets.service";

@Module({
  imports: [ConfigModule, RepositoryModule, JwtModule],
  providers: [WalletService, UserService, PaymentService],
  exports: [WalletService, UserService, PaymentService],
})
export class ServicesModule {}
