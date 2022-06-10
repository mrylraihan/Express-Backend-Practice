const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 3001

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('short'))
app.use(cors())

mongoose.connect('mongodb://localhost/notes-db')
// require controller
const notesRouter = require('./routers/notes_controllers')
// app.use(routes)
app.use('/notes',notesRouter)

app.get('/', (req, res)=>{
    res.json({message:'checkout your notes!'})
})

const listener =()=>{
    console.log(`listening to port ${port} `);
}

app.listen(port, listener)