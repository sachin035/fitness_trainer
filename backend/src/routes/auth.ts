import { Router } from "express";

import { createUserSchema, loginSchema } from "../schema/user";
import { validateReqBody } from "../middleware/validator";
import { login, signup } from "../controller.ts/auth";

const router = Router();

router.post("/signup", validateReqBody(createUserSchema), signup);

router.post("/login", validateReqBody(loginSchema), login);

router.get("/refresh");

export default router;
