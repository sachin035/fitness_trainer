import { IProfile } from "../interface/profile";
import ProfileModel from "../model/profile";

export async function createProfile(profile: IProfile) {
  return await ProfileModel.createProfile(profile);
}
