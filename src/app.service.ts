import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  healthCheck() {
    return { status: "UP" };
  }

  login(data) {
    return;
  }
}
