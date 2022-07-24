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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const repository_service_1 = require("../repository/repository.service");
let WalletService = class WalletService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(data) {
        let user = await this.repository.getUser({ email: data.email });
        if (user) {
            throw new common_1.HttpException({ status: "failed", message: "User Already Exists" }, common_1.HttpStatus.BAD_REQUEST);
        }
        user = await this.repository.createUser(data);
        return {
            status: "success",
            message: "User successfully created",
        };
    }
    async get(id) {
        const user = await this.repository.getUser({ _id: id });
        if (!user) {
            throw new common_1.HttpException({ message: "User Not Found" }, common_1.HttpStatus.NOT_FOUND);
        }
        return {
            status: "success",
            message: "User successfully fetched",
            data: user,
        };
    }
    async fund(data) {
        return {
            status: "success",
            message: "User successfully fetched",
            data,
        };
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_service_1.RepositoryService])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallets.service.js.map