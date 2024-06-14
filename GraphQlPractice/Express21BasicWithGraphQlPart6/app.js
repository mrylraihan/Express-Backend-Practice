const express = require('express')
const app = express()
const cors = require('cors')
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolver')
const port = 4000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/graphql', graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql:true
}))

app.get('/', (req, res)=>res.json({message:"Im on and live"}))

const listener = ()=>console.log(`We are jamming on Port:${port}`)

app.listen(port, listener)
