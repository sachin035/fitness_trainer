import * as profileServices from "./profileServies";
import ProfileModel from "../model/profile";
import { IProfile } from "../interface/profile";

export const createProfile = async (profileData: IProfile) => {
  const newProfile = {
    ...profileData,
  };
  await profileServices.createProfile(newProfile);
  return {
    profile: newProfile,
    message: "Profile created succeesfully",
  };
};
