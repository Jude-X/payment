import { Test, TestingModule } from "@nestjs/testing";
import { WalletService } from "./wallets.service";

describe("Service", () => {
  let walletService: WalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletService],
    }).compile();

    walletService = module.get<WalletService>(WalletService);
  });

  it("should be defined", () => {
    expect(walletService).toBeDefined();
  });
});
