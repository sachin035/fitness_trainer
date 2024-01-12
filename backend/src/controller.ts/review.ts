import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as review from "../service/review";
import { IReview } from "../interface/review";

interface ExtendedRequest extends Request {
  user_id: number;
  profile: number;
}
export async function createReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const extendedRequest = req as ExtendedRequest;
  console.log("er", extendedRequest.profile);
  const reviewData: IReview = {
    ...req.body,
    user_id: extendedRequest.user_id,
    profile_id: extendedRequest.profile,
  };

  try {
    console.log("milena1", reviewData);
    const data = await review.createReview(reviewData);
    return res.status(HttpStatus.CREATED).json(data);
  } catch (error) {
    // res.status(500).json({ message: "Something in the review wrong" });
    next(error);
  }
}
