// to get this fine you must run npm knex init, this is allowing you to set up you knex file
module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/choresDB'
  }

};
