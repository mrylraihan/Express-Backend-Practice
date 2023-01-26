const express = require('express')
const mongoose = require('mongoose')
const app = express()

const port =4000
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//connect to db
mongoose.connect('mongodb://localhost/vacations_db2')
const destinationsController = require('./routers/destinations_controller')
const usersController = require('./routers/users_controller')

app.use('/destinations', destinationsController)
app.use('/users', usersController)

app.get('/', (req, res)=>{
    // res.send('index.html ')
    // res.send('hey im working ')
    res.json({message:'hey im working '})
})

const listener = ()=>{
    console.log('express app is working');
}

app.listen(port, listener)