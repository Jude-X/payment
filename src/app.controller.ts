import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AppService } from "./app.service";
import { PaymentService } from "./services/payments.service";
import { UserService } from "./services/users.service";
import { WalletService } from "./services/wallets.service";
import * as DTOs from "./dtos";
import { WalletFundDto } from "./dtos";
import { AuthService } from "./auth/auth.service";
import { LocalPrincipalGuard } from "./auth/auth.local.guard";
import { JwtPrincipalGuard } from "./auth/auth.jwt.guard";

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

  @Get("/users")
  getUsers() {
    return this.userService.get();
  }

  @Post("/wallets")
  createWallets(@Body() data: DTOs.WalletDto) {
    return this.walletService.create(data);
  }

  @Get("/wallets/:id")
  getWallet(@Param("id") id: string) {
    return this.walletService.get(id);
  }

  @Get("/wallets")
  getWallets() {
    return this.walletService.get();
  }

  @UseGuards(JwtPrincipalGuard)
  @Post("wallets/fund")
  fundWallet(@Body() data: WalletFundDto, @Request() req) {
    return this.walletService.fund(data, req.userId);
  }

  @UseGuards(JwtPrincipalGuard)
  @Post("payment/initiate")
  initiatePayment(@Body() data: DTOs.PaymentDto[], @Request() req) {
    return this.paymentService.initiate(data, req.userId);
  }

  @UseGuards(JwtPrincipalGuard)
  @Post("payment/refund")
  refundPayment(@Body() data: DTOs.RefundDto, @Request() req) {
    return this.paymentService.refund(data, req.userId);
  }

  @UseGuards(JwtPrincipalGuard)
  @Post("payments/verify/:id")
  verifyPayment(@Param("id") id: string) {
    return this.paymentService.verify(id);
  }

  @UseGuards(JwtPrincipalGuard)
  @Post("requests/verify/:id")
  verifyRequest(@Param("id") id: string) {
    return this.paymentService.verifyRequest(id);
  }

  @UseGuards(LocalPrincipalGuard)
  @Post("/login")
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
