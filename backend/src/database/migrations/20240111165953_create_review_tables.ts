import { Knex } from "knex";
// import { PEOPLE } from '../../constants/database';

const TABLE_NAME = "reviews";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("review_id").primary();
    table.string("rating", 1).notNullable();
    table.string("comment", 525).notNullable();

    table
      .bigInteger("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");

    table
      .bigInteger("profile_id")
      .unsigned()
      .notNullable()
      .references("profile_id")
      .inTable("profiles");

    // table
    //   .bigInteger("updated_by")
    //   .unsigned()
    //   .references("id")
    //   .inTable(TABLE_NAME)
    //   .nullable();
  });
}

/**
 * Drop table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(TABLE_NAME);
}
