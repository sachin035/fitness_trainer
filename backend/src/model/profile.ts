import BaseModel from "./baseModel";

import { IProfile } from "../interface/profile";

export default class ProfileModel extends BaseModel {
  static async createProfile(profile: IProfile) {
    return this.queryBuilder().insert(profile).table("profiles");
  }
}
