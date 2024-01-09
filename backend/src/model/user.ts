import BaseModel from "./baseModel";
import { ISignup } from "../interface/auth";

export default class UserModel extends BaseModel {
  static async getAllUsers() {
    return this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
      })
      .from("users");
  }

  static async getUserById(id: number) {
    return this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
      })
      .from("users")
      .where({ id })
      .first();
  }
  static async getUserByUsername(username: string) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        password: "password",
        email: "email",
      })
      .from("users")
      .where({ username })
      .first();

    return user?.[0];
  }

  static async getUserByEmail(email: string) {
    console.log("last", email);
    const user = await this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        email: "email",
        password: "password",
      })
      .from("users")
      .where({ email })
      .first();
    console.log("userMansij", user);

    return user;
  }

  static async createUser(user: ISignup) {
    return this.queryBuilder().insert(user).table("users");
  }

  static async updateUser(id: number, user: ISignup) {
    return this.queryBuilder().update(user).table("users").where({ id });
  }
  static async deleteUser(id: number) {
    return this.queryBuilder().table("users").where({ id }).del();
  }
}
