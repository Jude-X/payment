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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const repository_service_1 = require("../repository/repository.service");
let AuthService = class AuthService {
    constructor(repository, jwtService) {
        this.repository = repository;
        this.jwtService = jwtService;
    }
    async login(data) {
        const user = await this.repository.getUser({ email: data.email });
        if (!user) {
            throw new common_1.HttpException({
                status: "failed",
                message: "User Not Found",
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const payload = { userId: user.id };
        return {
            status: "success",
            message: "You're Logged In",
            data: {
                access_token: this.jwtService.sign(payload),
            },
        };
    }
    async verify(data) {
        const user = await this.repository.getUser({ email: data.email });
        if (!user) {
            throw new common_1.HttpException({
                status: "failed",
                message: "User Not Found",
            }, common_1.HttpStatus.NOT_FOUND);
        }
        const payload = { userId: user.id };
        return {
            status: "success",
            message: "You're Logged In",
            data: {
                access_token: this.jwtService.sign(payload),
            },
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [repository_service_1.RepositoryService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map