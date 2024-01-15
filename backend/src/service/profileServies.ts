import BadRequestError from "../error/badRequestError";
import { IProfile } from "../interface/profile";
import ProfileModel from "../model/profile";

export async function getProfile(user_id: number) {
  const profile = await ProfileModel.getProfile(user_id);
  return profile;
}
export async function createProfile(profile: IProfile) {
  return await ProfileModel.createProfile(profile);
}

export async function getAllProfile() {
  const profile = await ProfileModel.getAllProfile();
  console.log(profile);
  return profile;
}
export async function getFilteredProfile(category: string, location: string) {
  const profile = await ProfileModel.getFilteredProfile(category, location);
  console.log(profile);
  return profile;
}

export async function deleteProfile(user_id: number) {
  const profile = await ProfileModel.deleteProfile(user_id);
  return profile;
}

export async function updateProfile(profileData: IProfile) {
  const profile = await ProfileModel.updateProfile(profileData);
  return profile;
}
