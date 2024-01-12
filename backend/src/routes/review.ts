import { Router } from "express";
import { validateReqBody } from "../middleware/validator";
import { auth } from "../middleware/auth";
import { createReview } from "../controller.ts/review";
const reviewRouter = Router();

reviewRouter.post("/", auth, createReview);

export default reviewRouter;
