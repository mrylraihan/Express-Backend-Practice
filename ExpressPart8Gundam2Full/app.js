const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('short'))
app.use(cors())


mongoose.connect('mongodb://localhost/gundams2_db')

// setting up routes
const pilotsController = require('./routers/pilots_controller')
const gundamsController = require('./routers/gundams_controller')
app.use('/pilots', pilotsController)
app.use('/gundams', gundamsController)
app.get('/', (req, res)=>{
    res.json({message:'Zero System activated!'})
})


const listener = ()=>{
    console.log(`listening to port ${port}`);
}

app.listen(port, listener)