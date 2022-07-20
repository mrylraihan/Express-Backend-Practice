const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const app = express()

const PORT = 4001

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/designerFurniture_db')

const designerController = require('./routers/designer_controller')
const furnitureController = require('./routers/furniture_controller')

app.use('/designer', designerController)
app.use('/furniture', furnitureController)

app.get('/', (req, res)=>{
    res.json({message:"Furniture express app"})
})

const listener = ()=>console.log(`we are all on that smooth port ${PORT} jamming`);

app.listen(PORT, listener)
