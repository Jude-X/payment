import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserDto } from "../dtos";
import { RepositoryService } from "../repository/repository.service";
import * as bcrypt from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
  constructor(
    private repository: RepositoryService,
    private configService: ConfigService
  ) {}

  public async create(data: UserDto) {
    //Check if user exists
    let user = await this.repository.getUser({ email: data.email });
    if (user) {
      throw new HttpException(
        { status: "failed", message: "User Already Exists" },
        HttpStatus.BAD_REQUEST
      );
    }
    const salt = bcrypt.genSaltSync(this.configService.get("SALT_ROUNDS"));
    const hash = bcrypt.hashSync(data.password, salt);
    data.password = hash;
    data.salt = salt;
    user = await this.repository.createUser(data);
    return {
      status: "success",
      message: "User successfully created",
      userId: user._id,
    };
  }

  public async get(id?: string) {
    if (!id) {
      //Fetch All Users
      const users = await this.repository.getUsers();
      return {
        status: "success",
        message: "Users successfully fetched",
        data: users.map((user) => {
          return {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          };
        }),
      };
    }

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
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    };
  }
}
