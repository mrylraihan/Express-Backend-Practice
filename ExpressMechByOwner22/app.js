const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = 4000;

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost/GundamNextjsProject2024")

const pilotController = require('./controllers/pilot_controller')
const mechController = require('./controllers/mech_controller')

app.use('/pilot',pilotController)
app.use('/mech',mechController)

app.get('/', (req, res)=>{
    res.json({message:"im working!"})
})

app.use((req, res)=>{
    res.json({message:"Route not found"})
})

app.listen(PORT, ()=>{
    console.log('jamming on port :'+PORT+"👽")
})