import { Controller, Get, Post } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post("/users")
  createUsers(): string {
    return this.appService.getHello();
  }

  @Get("/users/:id")
  getUser(): string {
    return this.appService.getHello();
  }

  @Post("/wallets")
  createWallets(): string {
    return this.appService.getHello();
  }

  @Get("/wallets/:id")
  getWallet(): string {
    return this.appService.getHello();
  }

  @Post("wallets/fund")
  fundWallet(): string {
    return this.appService.getHello();
  }

  @Post("payment/initiate")
  initiatePayment(): string {
    return this.appService.getHello();
  }

  @Post("payment/refund")
  refundPayment(): string {
    return this.appService.getHello();
  }

  @Post("payments/verify/:id")
  verifyPayment(): string {
    return this.appService.getHello();
  }

  @Get("/payments/:id")
  getPayment(): string {
    return this.appService.getHello();
  }

  @Post("/login")
  login(): string {
    return this.appService.getHello();
  }
}
