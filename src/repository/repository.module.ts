import { Module } from "@nestjs/common";
import { RepositoryService } from "./repository.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "../schemas/user.schema";
import { PaymentSchema } from "src/schemas/payment.schema";
import { WalletSchema } from "src/schemas/wallet.schema";
import { BulkSchema } from "src/schemas/bulk.schema";
import { LedgerSchema } from "src/schemas/ledger.schema";
import { RefundSchema } from "src/schemas/refund.schema";
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: "User", schema: UserSchema },
      { name: "Payment", schema: PaymentSchema },
      { name: "Wallet", schema: WalletSchema },
      { name: "Ledger", schema: LedgerSchema },
      { name: "Refund", schema: RefundSchema },
      { name: "Bulk", schema: BulkSchema },
    ]),
  ],
  providers: [RepositoryService],
  exports: [RepositoryService],
})
export class RepositoryModule {}
