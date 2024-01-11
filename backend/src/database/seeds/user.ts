import { Knex } from "knex";

const TABLE_NAME = "users";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          // colName: 'rowValue',
          // colName2: 'rowValue'

          username: "Sachin",
          email: "sachinmdr@gmail.com",
          password: "sachin123",
          //role
          //
        },
        {
          username: "Manandhar",
          email: "manandhar@gmail.com",
          password: "mdr123",
        },
      ]);
    });
}
