/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('artists').del()
    .then(() => {
      return knex('artists').insert([
        { id: 1, name: 'Nicki Minaj' },
        { id: 2, name: 'Lady Gaga' },
        { id: 3, name: 'Nickel Creek' },
        { id: 4, name: 'Fleetwood Mac' },
        { id: 5, name: 'Lincoln Park' }
      ])
        .then(() => {
          return knex.raw(`SELECT setval('artists_id_seq', (SELECT MAX(id) FROM artists));`)
        })
    })
};

// npx knex seed:run --specific=<filename>
// npx knex seed:run