const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const Port = 4000
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/notes-db3')


const notesController = require('./controllers/note_controller')
app.use('/note', notesController)

app.get('/', (req, res)=>res.json({message:'We are live!'}))

const listener = ()=>console.log(`lets practice on port 💻 ${Port}`)

app.listen(Port, listener)

 