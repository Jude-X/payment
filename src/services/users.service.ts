import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RepositoryService } from "../repository/repository.service";

@Injectable()
export class UserService {
  constructor(private repository: RepositoryService) {}

  public async create(data) {
    //Check if user exists
    let user = await this.repository.getUser({ email: data.email });
    if (user) {
      throw new HttpException(
        { status: "failed", message: "User Already Exists" },
        HttpStatus.BAD_REQUEST
      );
    }
    user = await this.repository.createUser(data);
    return {
      status: "success",
      message: "User successfully created",
    };
  }

  public async get(id: string) {
    //Check if user exists
    const user = await this.repository.getUser({ _id: id });
    if (!user) {
      throw new HttpException(
        { message: "User Not Found" },
        HttpStatus.NOT_FOUND
      );
    }

    return {
      status: "success",
      message: "User successfully fetched",
      data: user,
    };
  }
}
