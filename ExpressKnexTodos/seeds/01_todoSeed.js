/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('todo').del()
    .then(() => {
      return knex('todo').insert([
        {  title: 'Clean Clothes', body: 'do laundry' },
        {  title: 'Clean Rugs', body: 'do laundry' },
        {  title: 'Clean Fridge', body: 'Throw out everything' },
        {  title: 'Clean Bathroom', body: 'Get new toiletries' },
        {  title: 'code', body:'Study React'},
      ])
        // .then(() => {
        //   return knex.raw(`SELECT setval('todo_id_seq', (SELECT MAX(id) FROM todo));`)
        // })
    })
};

// npx knex seed:run --specific=<filename>
// npx knex seed:run