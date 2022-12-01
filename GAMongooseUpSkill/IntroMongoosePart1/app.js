const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
mongoose.connect('mongodb://localhost/mongoose-crud')

const app = express()

// middleware requests
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const peopleController = require('./routers/people_controllers')
app.use('/people', peopleController)
app.get('/', (req, res) => {
    res.send('hey lets get started!')
})
// error handler

// start app
app.listen(4000, () => console.log('Example app listening on port 4000!'))