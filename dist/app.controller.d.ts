/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AppService } from "./app.service";
import { PaymentService } from "./services/payments.service";
import { UserService } from "./services/users.service";
import { WalletService } from "./services/wallets.service";
import * as DTOs from "./dtos";
import { AuthService } from "./auth/auth.service";
export declare class AppController {
    private readonly appService;
    private readonly userService;
    private readonly walletService;
    private readonly paymentService;
    private readonly authService;
    constructor(appService: AppService, userService: UserService, walletService: WalletService, paymentService: PaymentService, authService: AuthService);
    healthCheck(): {
        status: string;
    };
    createUsers(data: DTOs.UserDto): Promise<{
        status: string;
        message: string;
    }>;
    getUser(id: string): Promise<{
        status: string;
        message: string;
        data: import("./schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    createWallets(data: DTOs.WalletDto): Promise<{
        status: string;
        message: string;
    }>;
    getWallet(id: string): Promise<{
        status: string;
        message: string;
        data: import("./schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    fundWallet(data: any): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    initiatePayment(data: DTOs.PaymentDto): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    refundPayment(data: DTOs.RefundDto): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    verifyPayment(id: string): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    login(data: any): Promise<{
        status: string;
        message: string;
        data: {
            access_token: string;
        };
    }>;
}
