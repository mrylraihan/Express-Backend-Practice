
exports.up = function (knex) {
    return knex.schema.createTable('songs', table => {
        table.increments()
        table.string('name')
        table.integer('duration')
        table.timestamps(true, true)
        table.integer('artist_id').notNullable()
        table.foreign('artist_id').references('id').inTable('artists')
    })
};


exports.down = function (knex) {
    return knex.schema.dropTable('songs')
};
