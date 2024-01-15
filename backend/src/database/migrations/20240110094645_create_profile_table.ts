import { Knex } from "knex";
// import { PEOPLE } from "../../constants/database";

const TABLE_NAME = "profiles";

/**
 * Create table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.bigIncrements("profile_id").primary();
    table.string("fullname", 255).notNullable();
    table.string("description", 525).notNullable();
    table.string("photo").nullable();
    table.string("available_time", 225).notNullable();
    table.string("address", 225).notNullable();
    table.string("minimum_charge", 225).notNullable();
    table.string("specialization", 225).notNullable();
    table.string("experience", 225).notNullable();
    table.string("contact_number", 225).notNullable();

    table
      .bigInteger("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users");

    // table.timestamp("created_at").notNullable().defaultTo(knex.raw("now()"));

    // table
    //   .bigInteger("created_by")
    //   .unsigned()
    //   .notNullable()
    //   .references("id")
    //   .inTable("users");

    // table.timestamp("updated_at").nullable();

    // table
    //   .bigInteger("updated_by")
    //   .unsigned()
    //   .references("id")
    //   .inTable(TABLE_NAME)
    //   .onDelete("CASCADE");
    //   //
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
