import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userServices from "./userServices";
import config from "../config";
import UserModel from "../model/user";
import { ILogin, ISignup } from "../interface/auth";
import {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
  SALT_ROUNDS,
} from "../constant/auth";
import UnauthenticatedError from "../error/unauthenticatedError";
import BadRequestError from "../error/badRequestError";
import NotFoundError from "../error/notFoundError";

export const signup = async (body: ISignup) => {
  const userExist = await UserModel.getUserByUsername(body.username);
  if (userExist) {
    throw new BadRequestError("User already exists");
  } else {
    const emailExist = await UserModel.getUserByEmail(body.email);
    if (emailExist) {
      throw new BadRequestError("Email already exists");
    }
  }
  const hashedPassword = bcrypt.hashSync(body.password, SALT_ROUNDS);

  const newUser = {
    ...body,
    password: hashedPassword,
  };
  await userServices.createUser(newUser);
  return { user: newUser, message: "User signed up successfully" };
};

export async function login(body: ILogin) {
  //Find user by username
  // const userExist = await userServices.getUserByUsername(body.username);

  console.log(body.email);
  const emailExist = await userServices.getUserByEmail(body.email);
  console.log(emailExist);

  if (!emailExist) {
    throw new NotFoundError("Invalid email");
  }

  const user = emailExist;

  //Compare entered password
  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    throw new UnauthenticatedError("Invalid username or password");
  }

  //Generate Jwt access token
  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    config.jwt.accessTokenSecret!,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );

  //Generate Jwt refresh token
  const refreshToken = jwt.sign(
    { id: user.id, username: body.username },
    config.jwt.refreshTokenSecret!,
    { expiresIn: REFRESH_TOKEN_EXPIRY }
  );

  return { accessToken, refreshToken };
}
export async function regenerateToken(token: string) {
  const payload: any = jwt.verify(token, config.jwt.refreshTokenSecret!);

  delete payload.iat;
  delete payload.exp;

  const accessToken = jwt.sign(payload, config.jwt.accessTokenSecret!, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign(payload, config.jwt.refreshTokenSecret!, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });

  return { message: "Token regenerated", accessToken, refreshToken };
}
