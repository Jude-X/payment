"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const repository_module_1 = require("../repository/repository.module");
const payments_service_1 = require("./payments.service");
const users_service_1 = require("./users.service");
const wallets_service_1 = require("./wallets.service");
let ServicesModule = class ServicesModule {
};
ServicesModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, repository_module_1.RepositoryModule],
        providers: [wallets_service_1.WalletService, users_service_1.UserService, payments_service_1.PaymentService],
        exports: [wallets_service_1.WalletService, users_service_1.UserService, payments_service_1.PaymentService],
    })
], ServicesModule);
exports.ServicesModule = ServicesModule;
//# sourceMappingURL=services.module.js.map