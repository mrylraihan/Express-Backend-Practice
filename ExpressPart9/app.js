const express = require('express')

const app = express()

const port =4000


app.get('/', (req, res)=>{
    // res.send('index.html ')
    // res.send('hey im working ')
    res.json({message:'hey im working '})
})

const listener = ()=>{
    console.log('express app is working');
}

app.listen(port, listener)