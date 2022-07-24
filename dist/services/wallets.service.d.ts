import { RepositoryService } from "../repository/repository.service";
export declare class WalletService {
    private repository;
    constructor(repository: RepositoryService);
    create(data: any): Promise<{
        status: string;
        message: string;
    }>;
    get(id: string): Promise<{
        status: string;
        message: string;
        data: import("../schemas/user.schema").User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    fund(data: any): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
}
