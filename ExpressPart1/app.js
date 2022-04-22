const express = require('express')
const app = express()
const config = require('./knexfile').development
const knex = require('knex')(config)
port = 3001


app.get('/', (req, res)=>{
    res.send('hello world!')
})

app.get('/about', (req, res)=>{
    res.send('hello world its about me!')
})

app.listen(port, ()=>{
    console.log(`listening on port : ${port}`);
})