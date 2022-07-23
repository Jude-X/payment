import { Module } from "@nestjs/common";
import { WalletService } from "./wallets.service";

@Module({
  providers: [WalletService],
})
export class ServicesModule {}
