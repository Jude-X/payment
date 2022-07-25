import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ScheduleModule } from "@nestjs/schedule";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import config from "./config";
import { RepositoryModule } from "./repository/repository.module";
import { PaymentService } from "./services/payments.service";
import { ServicesModule } from "./services/services.module";
import { WalletService } from "./services/wallets.service";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        ServicesModule,
        MongooseModule.forRootAsync({
          imports: [
            ConfigModule.forRoot({
              isGlobal: true,
              load: [config],
            }),
            ScheduleModule.forRoot(),
          ],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>("MONGODB_URI"),
          }),
          inject: [ConfigService],
        }),
        RepositoryModule,
        AuthModule,
      ],
      controllers: [AppController],
      providers: [AppService, WalletService, PaymentService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it("should return status", async () => {
      const response = await appController.healthCheck();
      expect(response).toStrictEqual({ status: "UP" });
    });
  });
});
