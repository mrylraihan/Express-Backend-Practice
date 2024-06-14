const {ApolloServer} = require('apollo-server-express')
const typeDefs = require('./Schema/TypeDefs')
const resolvers = require('./Schema/Resolvers')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000

async function startServer() {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start(); // Await the server start
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    server.applyMiddleware({ app });

    app.listen(port, () => {
        console.log(`We are jamming on Port: ${port}`);
    });
}

startServer();
