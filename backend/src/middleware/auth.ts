import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UnauthenticatedError from "../error/unauthenticatedError";
import config from "../config";
import * as profileServices from "../service/profile";
import { IProfile } from "../interface/profile";

export const auth = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1] as string;

    if (!token) {
      throw new UnauthenticatedError("No access Token");
    }

    const user = jwt.verify(token, config.jwt.accessTokenSecret!) as {
      id: number;
    };
    // console.log(user);

    req.user_id = user.id as number;
    // const profile = await profileServices.getProfile(req.user_id);
    // console.log("auth ko ho", profile);

    // req.profile_id = profile.id as number;
    // if (!profile) {
    //   throw new UnauthenticatedError("Profile not found");
    // }

    // req.profile = profile.profile.profileId as number;
    // console.log("auth 2nd part", req.profile);

    next();
  } catch (error) {
    next(error);
  }
};
