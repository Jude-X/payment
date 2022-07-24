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
exports.RepositoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RepositoryService = class RepositoryService {
    constructor(userModel, walletModel, paymentModel, ledgerModel) {
        this.userModel = userModel;
        this.walletModel = walletModel;
        this.paymentModel = paymentModel;
        this.ledgerModel = ledgerModel;
    }
    async createUser(data) {
        return this.userModel.create(data);
    }
    async getUser(data) {
        return this.userModel.findOne(data);
    }
    async createWallet(data) {
        return this.walletModel.create(data);
    }
    async getWallet(id) {
        return this.walletModel.findById(id);
    }
    async createPayment(data) {
        return this.paymentModel.create(data);
    }
    async getPayment(id) {
        return this.paymentModel.findById(id);
    }
    async createLedger(data) {
        return this.ledgerModel.create(data);
    }
    async getLedger(id) {
        return this.ledgerModel.findById(id);
    }
};
RepositoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __param(1, (0, mongoose_1.InjectModel)("Wallet")),
    __param(2, (0, mongoose_1.InjectModel)("Payment")),
    __param(3, (0, mongoose_1.InjectModel)("Ledger")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], RepositoryService);
exports.RepositoryService = RepositoryService;
//# sourceMappingURL=repository.service.js.map