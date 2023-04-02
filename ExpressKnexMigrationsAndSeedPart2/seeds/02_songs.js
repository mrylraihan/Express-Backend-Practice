/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('songs').del()
    .then(() => {
      return knex('songs').insert([
        { id: 1, name: 'Starships', duration:210, artist_id:3 },
        { id: 2, name: 'The Lighthouse Tale', duration: 210, artist_id: 2 },
        { id: 3, name: 'The Fox', duration: 210, artist_id: 2 },
        { id: 4, name: 'Superbass', duration: 210, artist_id: 3 },
        { id: 5, name: 'Go Your Own Way', duration: 210, artist_id: 1 },
        { id: 6, name: 'Bad Romance', duration: 210, artist_id: 4 },
        { id: 7, name: 'Dreams', duration: 210, artist_id: 1 },
        { id: 8, name: 'Shallow', duration: 210, artist_id: 4 },
      ])
    })
    .then(() => {
      return knex.raw(`SELECT setval('songs_id_seq', (SELECT MAX(id) FROM songs));`)
    })
};

// npx knex seed:run --specific=<filename>
// npx knex seed:run