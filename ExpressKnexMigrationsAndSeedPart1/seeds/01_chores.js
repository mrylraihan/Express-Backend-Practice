/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('chores').del()
  .then(()=>{
    return knex('chores').insert([
      {id: 1, title: 'Clean Clothes'},
      {id: 2, title: 'Clean Rugs'},
      { id: 3, title: 'Clean Fridge'},
      { id: 4, title: 'Clean Bathroom'},
      { id: 5, title: 'Clean Bedroom'},
    ])
    .then(()=>{
      return knex.raw(`SELECT setval('chores_id_seq', (SELECT MAX(id) FROM chores));`)
    })
  })
};

// npx knex seed:run --specific=<filename>
// npx knex seed:run