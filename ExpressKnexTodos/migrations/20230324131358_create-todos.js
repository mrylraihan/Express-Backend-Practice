
exports.up = function (knex) {
    return knex.schema.createTable('todo', table => {
        table.increments();
        // table.increments('id').primary();for primary key
        table.string('title')
        table.string('body')
        table.timestamps(true, true)
    })
};


exports.down = function (knex) {
    return knex.schema.dropTable('todo')
};
// npx knex migrate:make create-chores-table; creates the migration file
// npx knex migrate:latest; runs the migration file