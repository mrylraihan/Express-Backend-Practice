
exports.up = function(knex) {
return knex.schema.createTable('chores', table=>{
    table.increments()
    table.string('title')
    table.timestamps(true, true)
})  
};


exports.down = function(knex) {
  return knex.schema.dropTable('chores')
};
// npx knex migrate:make create-chores-table; creates the migration file
// npx knex migrate:latest; runs the migration file