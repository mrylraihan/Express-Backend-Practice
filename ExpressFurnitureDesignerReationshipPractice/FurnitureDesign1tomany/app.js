const express= require('express')
const app = express()

const cors=require('cors')
const mongoose = require('mongoose')

const port = 4001

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

mongoose.connect('mongodb://localhost/designerFurniture_db2')


const designerController = require('./routers/designer_controller')
const furnitureController = require('./routers/furniture_controller')

app.use('/designer', designerController)
app.use('/furniture', furnitureController)

app.get('/', (req, res) => {
    res.json({ message: "Furniture express app 1 to many" })
})

const listener = () => console.log(`we are all on that smooth port ${port} jamming`);

app.listen(port, listener)
