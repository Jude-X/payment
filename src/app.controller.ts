import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { PaymentService } from "./services/payments.service";
import { UserService } from "./services/users.service";
import { WalletService } from "./services/wallets.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
    private readonly paymentService: PaymentService
  ) {}

  @Get()
  healthCheck() {
    return this.appService.healthCheck();
  }

  @Post("/users")
  createUsers(@Body() data) {
    return this.userService.create(data);
  }

  @Get("/users/:id")
  getUser(@Param("id") id) {
    return this.userService.get(id);
  }

  @Post("/wallets")
  createWallets(@Body() data) {
    return this.walletService.create(data);
  }

  @Get("/wallets/:id")
  getWallet(@Param("id") id) {
    return this.walletService.get(id);
  }

  @Post("wallets/fund")
  fundWallet(@Body() data) {
    return this.walletService.fund(data);
  }

  @Post("payment/initiate")
  initiatePayment(@Body() data) {
    return this.paymentService.initiate(data);
  }

  @Post("payment/refund")
  refundPayment(@Body() data) {
    return this.paymentService.refund(data);
  }

  @Post("payments/verify/:id")
  verifyPayment(@Param("id") id) {
    return this.paymentService.verify(id);
  }

  @Get("/payments/:id")
  getPayment(@Param("id") id) {
    return this.paymentService.get(id);
  }

  @Post("/login")
  login(@Body("data") data) {
    return this.appService.login(data);
  }
}
