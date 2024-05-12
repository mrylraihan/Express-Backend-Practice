module.exports = {

  development: {
    client: 'pg', 
    connection: 'postgres://localhost/todoDBTest'  //db location 
}
};
// npx knex init creates this file