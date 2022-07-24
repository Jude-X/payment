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
exports.LedgerSchema = exports.Ledger = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_schema_1 = require("./payment.schema");
let Ledger = class Ledger {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: "Payment",
    }),
    __metadata("design:type", payment_schema_1.Payment)
], Ledger.prototype, "payment", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        required: true,
    }),
    __metadata("design:type", String)
], Ledger.prototype, "oldBalance", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: Number,
        require: true,
    }),
    __metadata("design:type", String)
], Ledger.prototype, "newBalance", void 0);
Ledger = __decorate([
    (0, mongoose_1.Schema)()
], Ledger);
exports.Ledger = Ledger;
exports.LedgerSchema = mongoose_1.SchemaFactory.createForClass(Ledger);
//# sourceMappingURL=ledger.schema.js.map