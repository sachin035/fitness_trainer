import { Router } from "express";
import router from ".";
import { createProfileSchema } from "../schema/profile";
import { validateReqBody } from "../middleware/validator";
import { auth } from "../middleware/auth";
import {
  createProfile,
  getAllProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  getFilteredProfile,
} from "../controller.ts/profile";
const profileRouter = Router();

profileRouter.get("/all", auth, getAllProfile);
profileRouter.get("/", auth, getProfile);
profileRouter.get("/all/search", auth, getFilteredProfile);
profileRouter.post(
  "/",
  auth,
  validateReqBody(createProfileSchema),
  createProfile
);

profileRouter.put("/", auth, updateProfile);
profileRouter.delete("/", auth, deleteProfile);

export default profileRouter;
