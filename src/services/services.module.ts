import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RepositoryModule } from "src/repository/repository.module";
import { PaymentService } from "./payments.service";
import { UserService } from "./users.service";
import { WalletService } from "./wallets.service";

@Module({
  imports: [ConfigModule, RepositoryModule],
  providers: [WalletService, UserService, PaymentService],
  exports: [WalletService, UserService, PaymentService],
})
export class ServicesModule {}
