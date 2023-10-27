/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, username: 'user1', password:"123"},
    {id: 2, username: 'user2', password:"123"},
    {id: 3, username: 'user3', password:"123"}
  ])
    .then(() => {
      return knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));`)
    })

};
