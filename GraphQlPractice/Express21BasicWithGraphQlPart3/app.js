const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 4000;
const app = express()
const { graphqlHTTP } = require('express-graphql')
const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolvers')

mongoose.connect('mongodb://localhost/testDB2024')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/graphql', graphqlHTTP({
    schema:graphqlSchema,
    rootValue:graphqlResolver,
    graphiql:true
}))

app.get('/',(req, res)=>{
    res.json({message:"im live"})
})

const listener = ()=>console.log('running on port:' +PORT)

app.listen(PORT, listener)