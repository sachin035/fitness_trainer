import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as profileServices from "../service/profile";
import { IProfile } from "../interface/profile";

export async function createProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const profileData: IProfile = req.body;

  try {
    const data = await profileServices.createProfile(profileData);
    return res.status(HttpStatus.CREATED).json(data);
  } catch (error) {
    next(error);
  }
}
