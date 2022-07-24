import { Injectable } from "@nestjs/common";
import { RepositoryService } from "../repository/repository.service";

@Injectable()
export class PaymentService {
  constructor(private repository: RepositoryService) {}

  public async initiate(data) {
    return {
      status: "success",
      message: "User successfully fetched",
      data,
    };
  }

  public async refund(data) {
    return {
      status: "success",
      message: "User successfully fetched",
      data,
    };
  }

  public async verify(data) {
    return {
      status: "success",
      message: "User successfully fetched",
      data,
    };
  }
}
