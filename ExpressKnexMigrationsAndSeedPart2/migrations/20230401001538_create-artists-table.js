
exports.up = function (knex) {
    return knex.schema.createTable('artists', table => {
        table.increments()
        table.string('name')
        table.timestamps(true, true)
    })
};


exports.down = function (knex) {
    return knex.schema.dropTable('artists')
};
