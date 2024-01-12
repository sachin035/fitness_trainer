import { Router } from "express";
import authRouter from "./auth";
import profileRouter from "./profile";
import reviewRouter from "./review";

const router = Router();

router.use("/auth", authRouter);
router.use("/profile", profileRouter);
router.use("/review", reviewRouter);

export default router;
