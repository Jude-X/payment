import { Module } from "@nestjs/common";
import { RepositoryService } from "./repository.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
import { PaymentSchema } from "src/schemas/payment.schema";
import { WalletSchema } from "src/schemas/wallet.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Payment", schema: PaymentSchema },
      { name: "Wallet", schema: WalletSchema },
      { name: "Ledger", schema: WalletSchema },
    ]),
  ],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
