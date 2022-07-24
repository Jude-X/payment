import { JwtService } from "@nestjs/jwt";
import { RepositoryService } from "../repository/repository.service";
export declare class AuthService {
    private repository;
    private jwtService;
    constructor(repository: RepositoryService, jwtService: JwtService);
    login(data: any): Promise<{
        status: string;
        message: string;
        data: {
            access_token: string;
        };
    }>;
    verify(data: any): Promise<{
        status: string;
        message: string;
        data: {
            access_token: string;
        };
    }>;
}
