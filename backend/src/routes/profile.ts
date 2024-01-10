import { Router } from "express";
import router from ".";
import { createProfileSchema } from "../schema/profile";
import { validateReqBody } from "../middleware/validator";
import { auth } from "../middleware/auth";
import { createProfile } from "../controller.ts/profile";
const profileRouter = Router();

// profileRouter.get("/all", getAllProfile);
// profileRouter.get("/", auth, getProfile);
profileRouter.post(
  "/",
  auth,
  validateReqBody(createProfileSchema),
  createProfile
);
// profileRouter.put("/", auth, updateProfile);
// profileRouter.delete("/", auth, deleteProfile);

export default profileRouter;
