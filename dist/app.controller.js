"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const payments_service_1 = require("./services/payments.service");
const users_service_1 = require("./services/users.service");
const wallets_service_1 = require("./services/wallets.service");
const DTOs = require("./dtos");
const auth_service_1 = require("./auth/auth.service");
let AppController = class AppController {
    constructor(appService, userService, walletService, paymentService, authService) {
        this.appService = appService;
        this.userService = userService;
        this.walletService = walletService;
        this.paymentService = paymentService;
        this.authService = authService;
    }
    healthCheck() {
        return this.appService.healthCheck();
    }
    createUsers(data) {
        return this.userService.create(data);
    }
    getUser(id) {
        return this.userService.get(id);
    }
    createWallets(data) {
        return this.walletService.create(data);
    }
    getWallet(id) {
        return this.walletService.get(id);
    }
    fundWallet(data) {
        return this.walletService.fund(data);
    }
    initiatePayment(data) {
        return this.paymentService.initiate(data);
    }
    refundPayment(data) {
        return this.paymentService.refund(data);
    }
    verifyPayment(id) {
        return this.paymentService.verify(id);
    }
    login(data) {
        return this.authService.login(data);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "healthCheck", null);
__decorate([
    (0, common_1.Post)("/users"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs.UserDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createUsers", null);
__decorate([
    (0, common_1.Get)("/users/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)("/wallets"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs.WalletDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "createWallets", null);
__decorate([
    (0, common_1.Get)("/wallets/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Post)("wallets/fund"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "fundWallet", null);
__decorate([
    (0, common_1.Post)("payment/initiate"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs.PaymentDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "initiatePayment", null);
__decorate([
    (0, common_1.Post)("payment/refund"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DTOs.RefundDto]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "refundPayment", null);
__decorate([
    (0, common_1.Post)("payments/verify/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "verifyPayment", null);
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Body)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "login", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        users_service_1.UserService,
        wallets_service_1.WalletService,
        payments_service_1.PaymentService,
        auth_service_1.AuthService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map