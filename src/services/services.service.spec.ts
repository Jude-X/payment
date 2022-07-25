import { Test, TestingModule } from "@nestjs/testing";
import { ServicesModule } from "./services.module";
import { WalletService } from "./wallets.service";

describe("Service", () => {
  let walletService: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServicesModule],
      providers: [WalletService],
    }).compile();

    walletService = module.get<WalletService>(WalletService);
  });

  it("should be defined", () => {
    expect(walletService).toBeDefined();
  });
});
