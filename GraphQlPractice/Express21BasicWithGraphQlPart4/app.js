const express = require('express');
const cors = require('cors')
const PORT = 4000;
const app = express();
const { graphqlHTTP } = require('express-graphql');
const data = require('./Data/data');
const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolver')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
    formatError(err){
        if(!err.originalError){
        return err
        }
        const data = err.originalError.data;
        const message = err.message || 'An error occurred';
        const code = err.originalError.code || 500;
        return { message, code, data };
    }
}))

app.get('/', (req, res) => res.json({ message: "first route" }))

app.get('/data', (req, res) => {
    console.log(data)
    res.json(data)
})

const listener = () => console.log(`Listening on port ${PORT}`);

app.listen(PORT, listener)