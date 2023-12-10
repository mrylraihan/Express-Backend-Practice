const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const port = 4000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/testdb2')

const taskController = require('./controllers/taskControllers')

app.use('/tasks',taskController)

app.get('/', (req, res)=>{
    res.json({message:"testing we are live!"})
})
app.use((req, res)=>{
    res.json({message:"Route not found!"})
})

const listener = ()=>console.log(`Jamming to PORT:${port}`)

app.listen(port, listener)