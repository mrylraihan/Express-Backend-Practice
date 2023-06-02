const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const cookieParser = require('cookie-parser')

const port = 4000
const app = express()

mongoose.connect('mongodb://localhost/testDbIII')
require('dotenv').config()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

const userController = require('./routers/user_controller')
app.use('/user', userController)

const todoController = require('./routers/todo_controller')
app.use('/todo', todoController)

app.get('/', (req, res)=>{
    res.send('Hello World')
})

const listener = ()=>console.log(`running on that port #${port}`)

app.listen(port, listener)