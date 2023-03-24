/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(() => {
      return knex('todo').insert([
        { id: 1, title: 'Clean Clothes', body: 'do laundry' },
        { id: 2, title: 'Clean Rugs', body: 'do laundry' },
        { id: 3, title: 'Clean Fridge', body: 'Throw out everything' },
        { id: 4, title: 'Clean Bathroom', body: 'Get new toiletries' },
        { id: 5, title: 'code', body:'Study React'},
      ])
        .then(() => {
          return knex.raw(`SELECT setval('todo_id_seq', (SELECT MAX(id) FROM todo));`)
        })
    })
};

// npx knex seed:run --specific=<filename>
// npx knex seed:run