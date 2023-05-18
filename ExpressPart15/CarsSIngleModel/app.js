const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const port = 4001

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

mongoose.connect('mongodb://localhost/carDealerShip_db1')
const carController = require('./routes/car_controller')

app.use('/cars', carController)
app.get('/', (req, res)=>{
    res.json({message:'im working'})
})

const listener =()=>{
    console.log(`hey we are running on port ${port}`)
}

app.listen(port, listener)