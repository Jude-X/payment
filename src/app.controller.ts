import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { PaymentService } from "./services/payments.service";
import { UserService } from "./services/users.service";
import { WalletService } from "./services/wallets.service";
import * as DTOs from "./dtos";
import { AuthService } from "./auth/auth.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
    private readonly paymentService: PaymentService,
    private readonly authService: AuthService
  ) {}

  @Get()
  healthCheck() {
    return this.appService.healthCheck();
  }

  @Post("/users")
  createUsers(@Body() data: DTOs.UserDto) {
    return this.userService.create(data);
  }

  @Get("/users/:id")
  getUser(@Param("id") id: string) {
    return this.userService.get(id);
  }

  @Post("/wallets")
  createWallets(@Body() data: DTOs.WalletDto) {
    return this.walletService.create(data);
  }

  @Get("/wallets/:id")
  getWallet(@Param("id") id: string) {
    return this.walletService.get(id);
  }

  @Post("wallets/fund")
  fundWallet(@Body() data) {
    return this.walletService.fund(data);
  }

  @Post("payment/initiate")
  initiatePayment(@Body() data: DTOs.PaymentDto) {
    return this.paymentService.initiate(data);
  }

  @Post("payment/refund")
  refundPayment(@Body() data: DTOs.RefundDto) {
    return this.paymentService.refund(data);
  }

  @Post("payments/verify/:id")
  verifyPayment(@Param("id") id: string) {
    return this.paymentService.verify(id);
  }

  @Post("/login")
  login(@Body("data") data) {
    return this.authService.login(data);
  }
}
