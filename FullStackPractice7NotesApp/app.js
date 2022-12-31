const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const port = 4000

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

mongoose.connect('mongodb://localhost/notes-db3')
const userController = require('./routers/users_controllers')
const noteController = require('./routers/notes_controllers')
app.use('/users', userController)
app.use('/notes', noteController)
app.get('/', (req, res)=>{
    res.json({message:'its working'})
})

const listener = () =>{
    console.log(`we are now listening to that smooth smooth on port ${port}`);
}
app.listen(port, listener)