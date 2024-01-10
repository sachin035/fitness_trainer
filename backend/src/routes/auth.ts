import { Router } from "express";

import { createUserSchema, loginSchema } from "../schema/user";
import { validateReqBody } from "../middleware/validator";
import { login, signup } from "../controller.ts/auth";

const authRouter = Router();

authRouter.post("/signup", validateReqBody(createUserSchema), signup);

authRouter.post("/login", validateReqBody(loginSchema), login);

authRouter.get("/refresh");

export default authRouter;
