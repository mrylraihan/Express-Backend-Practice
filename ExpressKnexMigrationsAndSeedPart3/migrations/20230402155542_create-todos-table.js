exports.up = function (knex) {
    return knex.schema.createTable('todos', table => {
        table.increments()
        table.string('title')
        table.string('body')
        table.timestamps(true, true)
        table.integer('user_id').notNullable()
        table.foreign('user_id').references('id').inTable('users')
    })
};




exports.down = function (knex) {
    return knex.schema.dropTable('todos')
};
