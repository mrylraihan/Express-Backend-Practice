const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = 4002

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/notesdb_ByOwner')
// mongoose connection
const userController = require('./routers/user_controller')
const notesController = require('./routers/notes_controller')

app.use('/user', userController)
app.use('/note', notesController)

app.get('/', (req, res)=>{
    res.json({message:'im working'})
})

const listener = ()=>{
    console.log('app is running on port '+ PORT)
}

app.listen(PORT, listener)