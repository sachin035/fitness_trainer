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

  static async getAllReview() {
    const result = await this.queryBuilder()
      .select({
        review_id: "reviews.review_id",
        rating: "reviews.rating",
        comment: "reviews.comment",
        profile_id: "reviews.profile_id",
        user_id: "reviews.user_id",
      })
      .from("reviews");
    return result;
  }

  static async getByIdReview(profile_id) {
    const result = await this.queryBuilder()
      .select({
        review_id: "reviews.review_id",
        rating: "reviews.rating",
        comment: "reviews.comment",
        profile_id: "reviews.profile_id",
        user_id: "reviews.user_id",
      })
      .from("reviews")
      .where("reviews.profile_id", profile_id)
      .first();
    return result;
  }
}
