import BaseModel from "./baseModel";

import { IReview } from "../interface/review";

export default class ReviewModel extends BaseModel {
  static async createReview(reviewData: IReview) {
    console.log("milena3");
    console.log(reviewData);
    return this.queryBuilder().insert(reviewData).table("reviews");
  }

  static async getUserByUserId(user_id: number) {
    const user = await this.queryBuilder()
      .select({
        user_id: "user_id",
      })
      .from("reviews")
      .where({ user_id })
      .first();
    console.log("model", user);
    return user;
  }
}
