import { RepositoryService } from "../repository/repository.service";
export declare class PaymentService {
    private repository;
    constructor(repository: RepositoryService);
    initiate(data: any): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    refund(data: any): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    verify(data: any): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
}
