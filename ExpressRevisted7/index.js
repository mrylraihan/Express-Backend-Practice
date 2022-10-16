const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = 4000

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/task_db_practice3')
const taskController = require('./routers/task-controller')
const userController = require('./routers/user_controller')

app.use('/task', taskController)
app.use('/user', userController)

app.get('/', (req, res)=>{
    res.json({message:'im working'})
})

const listener = ()=>console.log(`now jamming to that sweet sweet sounds from port ${port}`);

app.listen(port, listener)