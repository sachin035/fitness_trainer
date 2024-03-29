import * as profileServices from "./profileServies";
import ProfileModel from "../model/profile";
import { IProfile } from "../interface/profile";
import NotFoundError from "../error/notFoundError";

export const getProfile = async (user_id: number) => {
  const getProfile = await profileServices.getProfile(user_id);
  return {
    profile: getProfile,
    message: "Profile got successfully",
  };
};

export const createProfile = async (profileData: IProfile) => {
  await profileServices.createProfile(profileData);
  return {
    profile: profileData,
    message: "Profile created succeesfully",
  };
};

export const getAllProfile = async () => {
  return await profileServices.getAllProfile();
};
export const getFilteredProfile = async (
  category: string,
  location: string
) => {
  return await profileServices.getFilteredProfile(category, location);
};

export const deleteProfile = async (user_id: number) => {
  return await profileServices.deleteProfile(user_id);
};

export async function updateProfile(profileData: IProfile) {
  const updatedProfile = await profileServices.updateProfile(profileData);
  return updatedProfile;
}
