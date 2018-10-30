exports.up = async (knex) => {
  await knex.schema.createTable('properties', (table) => {
    table.increments('id').primary();
    table.uuid('uuid').unique().notNull();
    table.string('address').notNull();
    table.integer('user_id');
    table.foreign('user_id').references('users.id');
    table.timestamps(true, true);
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable('properties');
};
