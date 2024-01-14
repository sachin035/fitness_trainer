import { number } from "joi";
import BadRequestError from "../error/badRequestError";
import { IReview } from "../interface/review";
import ReviewModel from "../model/review";

export const createReview = async (reviewData: IReview) => {
  console.log("milena firstService");
  const userReviewExist = await ReviewModel.getUserByUserId(reviewData.user_id);
  if (userReviewExist) {
    throw new BadRequestError("User has already give reviews");
  } else {
    console.log("milena lastService");
    const rData = await ReviewModel.createReview(reviewData);
    return {
      review: rData,
      message: "Review created successfully",
    };
  }
};

export const getAllReview = async () => {
  return ReviewModel.getAllReview();
};
export const getByIdReview = async (profile_id: number) => {
  console.log(profile_id);
  const getReview = await ReviewModel.getByIdReview(profile_id);
  return {
    profile: getReview,
    message: "review got successfully",
  };
};
