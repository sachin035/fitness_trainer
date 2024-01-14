import { Router } from "express";
import { validateReqBody } from "../middleware/validator";
import { auth } from "../middleware/auth";
import {
  createReview,
  getAllReview,
  getByIdReview,
} from "../controller.ts/review";
const reviewRouter = Router();

reviewRouter.post("/", auth, createReview);
reviewRouter.get("/", auth, getAllReview);
// reviewRouter.get("/", auth, getByIdReview);

export default reviewRouter;
