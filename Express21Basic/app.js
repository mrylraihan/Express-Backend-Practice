const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const PORT = 4000;
const app = express()

mongoose.connect('mongodb://localhost/testDB2024')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const userController = require('./controllers/userController')
const noteController = require('./controllers/notesController')

app.use('/user', userController)
app.use('/note', noteController)

app.get('/',(req, res)=>{
    res.json({message:"im live"})
})

const listener = ()=>console.log('running on port:' +PORT)

app.listen(PORT, listener)