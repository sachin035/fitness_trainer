import BaseModel from "./baseModel";

import { IProfile } from "../interface/profile";
import { Knex } from "knex";

export default class ProfileModel extends BaseModel {
  static async createProfile(profileData: IProfile) {
    return this.queryBuilder().insert(profileData).table("profiles");
  }

  static async getAllProfile() {
    const result = await this.queryBuilder()
      .select({
        profile_id: "profiles.profile_id",
        fullname: "profiles.fullname",
        description: "profiles.description",
        available_time: "profiles.available_time",
        address: "profiles.address",
        minimum_charge: "profiles.minimum_charge",
        specialization: "profiles.specialization",
        contact_number: "profiles.contact_number",
        experience: "profiles.experience",
        user_id: "profiles.user_id",
      })
      .from("profiles");
    return result;
    // .leftJoin("professions", "profiles.profile_id", "professions.profile_id");
  }

  static async getFilteredProfile(
    category: string | undefined,
    location: string | undefined
  ) {
    let query = await this.queryBuilder()
      .select({
        profile_id: "profiles.profile_id",
        fullname: "profiles.fullname",
        description: "profiles.description",
        available_time: "profiles.available_time",
        address: "profiles.address",
        minimum_charge: "profiles.minimum_charge",
        specialization: "profiles.specialization",
        contact_number: "profiles.contact_number",
        experience: "profiles.experience",
      })
      .from("profiles")

      .where("profiles.specialization", category)
      .where("profiles.address", location);

    return query;
  }

  // if (category || location) {
  //   query = query.where((builder) => {
  //     if (category) {
  //       builder = builder.where("profiles.specialization", category);
  //     }

  //     if (location) {
  //       builder = builder.orWhere("profiles.address", location);
  //     }

  //     return builder;
  //   });
  // }

  // const result = await query;

  // return result;
  // .leftJoin("professions", "profiles.profile_id", "professions.profile_id");

  static async getProfile(user_id: number) {
    return (
      this.queryBuilder()
        .select({
          profile_id: "profiles.profile_id",
          fullname: "profiles.fullname",
          description: "profiles.description",
          available_time: "profiles.available_time",
          address: "profiles.address",
          minimum_charge: "profiles.minimum_charge",
          specialization: "profiles.specialization",
          contact_number: "profiles.contact_number",
          experience: "profiles.experience",
        })
        .from("profiles")
        // .leftJoin("professions", "profiles.profile_id", "professions.profile_id")
        .where("profiles.user_id", user_id)
        .first()
    );
  }

  static async deleteProfile(user_id: number) {
    return this.queryBuilder()
      .table("profiles")
      .where({ user_id: user_id })
      .del();
  }

  static async updateProfile(profileData: IProfile) {
    return this.queryBuilder().transaction(async (trx) => {
      //Find profile with profile_id associated with the provided user_id
      const [profile] = await trx("profiles")
        .where({ user_id: profileData.user_id })
        .returning("profile_id");

      //console.log(profile,typeof(profile));

      //Update profiles table:
      await trx("profiles").where({ user_id: profileData.user_id }).update({
        fullname: profileData.fullname,
        description: profileData.description,
        available_time: profileData.available_time,
        address: profileData.address,
        minimum_charge: profileData.minimum_charge,
        specialization: profileData.specialization,
        contact_number: profileData.contact_number,
        experience: profileData.experience,
      });
    });
  }
}
