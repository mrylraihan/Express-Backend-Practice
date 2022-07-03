const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')

const app = express()

//make sure our data can be sent in json format, and can accessed with cors
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/dbz_db')

const characterController = require('./routers/characters_controller')

app.use('/dbz', characterController)

app.get('/', (req, res)=>{
    res.json({message:'dbz backend working!'})
})

const port = 4000

const listener = ()=>{
    console.log(`listening to our dbz backend on port ${port}`);
}

app.listen(port, listener)