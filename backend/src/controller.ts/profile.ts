import { NextFunction, Request, Response } from "express";
import HttpStatus from "http-status-codes";
import * as profileServices from "../service/profile";
import { IProfile } from "../interface/profile";

interface ExtendedRequest extends Request {
  user_id: number;
}
export async function createProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const extendedRequest = req as ExtendedRequest;
  console.log("saclajs", extendedRequest.user_id);
  const profileData: IProfile = {
    ...req.body,
    user_id: extendedRequest.user_id,
  };
  console.log(profileData);

  try {
    const data = await profileServices.createProfile(profileData);
    return res.status(HttpStatus.CREATED).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getAllProfile(req: Request, res: Response) {
  try {
    const profile = await profileServices.getAllProfile();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
export interface IFilteredProfile {
  category: string;
  location: string;
}
export async function getFilteredProfile(req: Request, res: Response) {
  // console.log(req);
  // console.log(req.query);
  console.log(req.query);
  const response = req.query;
  if (
    typeof response.category === "string" &&
    typeof response.location === "string"
  ) {
    const result: IFilteredProfile = {
      category: response.category,
      location: response.location,
    };
    // const result1 = req.query as {};
    // console.log({ result });
    // console.log(result1);
    // const { categoryValue, locationValue } = result1;
    // const filterArray = result.split(",").map(String);
    // const categoryValue = filterArray[0] as string;
    // const locationValue = filterArray[1] as string;
    // console.log("nanas", categoryValue, locationValue);
    // const result1 = {
    //   categoryValue: result.category,
    //   locationValue: result.location,
    // };
    try {
      const profile = await profileServices.getFilteredProfile(
        result.category,
        result.location
      );
      console.log(profile);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    const extendedRequest = req as ExtendedRequest;
    const profile = await profileServices.getProfile(extendedRequest.user_id);
    return res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function deleteProfile(req: Request, res: Response) {
  try {
    const extendedRequest = req as ExtendedRequest;
    const profile = await profileServices.deleteProfile(
      extendedRequest.user_id
    );
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export async function updateProfile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const extendedRequest = req as ExtendedRequest;
  const profileData: IProfile = {
    ...req.body,
    user_id: extendedRequest.user_id,
  };

  try {
    const data = await profileServices.updateProfile(profileData);
    return res.status(HttpStatus.CREATED).json(data);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

//admin can hit a end point with payload:user_id,roles this will chnage the role of user id either to basic or to trainer.
