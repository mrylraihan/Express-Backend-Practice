const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const PORT = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect('mongodb://localhost/notes-db2')

const notesController = require('./routers/note_controller')

app.use('/note', notesController)

app.get('/', (req, res)=>{
    res.json({message:'im working!'})
})

const listener = ()=>{
    console.log(`Listening to that sweat jazz on port ${PORT}`)
}

app.listen(PORT, listener)