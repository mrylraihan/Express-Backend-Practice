const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const PORT = 4003

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/notesdb_OneToMany')
const userController = require('./routers/users_controller')
const noteController = require('./routers/notes_controller')
app.use('/user', userController)
app.use('/note', noteController)

app.get('/', (req, res)=>{
    res.json({message:'im working'})
})

const listener = ()=>{
    console.log(`application running on port ${PORT}`)
}

app.listen(PORT, listener)