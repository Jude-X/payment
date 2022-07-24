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
exports.PaymentSchema = exports.Payment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const wallet_schema_1 = require("./wallet.schema");
let Payment = class Payment {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "Wallet",
    }),
    __metadata("design:type", wallet_schema_1.Wallet)
], Payment.prototype, "wallet", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        enum: ["successful", "failed", "initiated"],
        default: "initiated",
    }),
    __metadata("design:type", String)
], Payment.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: ["refund", "funding", "transfer"],
    }),
    __metadata("design:type", String)
], Payment.prototype, "type", void 0);
Payment = __decorate([
    (0, mongoose_1.Schema)()
], Payment);
exports.Payment = Payment;
exports.PaymentSchema = mongoose_1.SchemaFactory.createForClass(Payment);
//# sourceMappingURL=payment.schema.js.map