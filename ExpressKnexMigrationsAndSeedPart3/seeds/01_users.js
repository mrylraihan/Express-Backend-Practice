/**
* @param { import("knex").Knex } knex
* @returns { Promise<void> }
*/
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        { id: 1, name: 'Goku Son' },
        { id: 2, name: 'Optimums Prime' },
        { id: 3, name: 'Abraham Lincoln' }
      ])
        .then(() => {
          return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
        })
    })
};