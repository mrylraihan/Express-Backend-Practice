/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(() => {
      return knex('todos').insert([
        { id: 1, title: 'Cut down a Tree', body: 'make homes', user_id: 3 },
        { id: 2, title: 'Rule the world', body: 'get all the AutoBots to Earth', user_id: 2 },
        { id: 3, title: 'Find bubble bee', body: 'Find allies', user_id: 2 },
        { id: 4, title: 'Write laws', body: 'Establish the US', user_id: 3 },
        { id: 5, title: 'Training with Veg', body: 'I have to find strong people', user_id: 1 },
        { id: 6, title: 'Fight in tournament', body: 'I have to get stronger', user_id: 1 },
        { id: 7, title: 'Pay Child support', body: 'For Gohan an Goten', user_id: 1 },
        { id: 8, title: 'Find more Transformers', body: 'to rule the world', user_id: 2 },
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('todos_id_seq', (SELECT MAX(id) FROM todos));`)
    })
};

// npx knex seed:run --specific=<filename>
// npx knex seed:run