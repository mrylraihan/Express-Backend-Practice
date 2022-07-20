const express = require('express')
const cors = require('cors')

//import mongoose so we can talk to our database 
const mongoose = require('mongoose')

const app = express()

const port = 4002
//data conversion 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// for cors
app.use(cors())

// instantiate our db
mongoose.connect('mongodb://localhost/task_db')
const taskController = require('./routers/tasks_controller')
app.use('/task', taskController)
// req(request)= is whatever  they are sending to use
// res(response) = is whatever we are sending back
app.get('/', (req, res)=>{
    res.json({message:'im working, all good!'})
})

const listener = ()=>{
    console.log(`hey we are now running our server on that smooth port ${port}`);
}
// run on this port 4002, call this method when its running the right way
app.listen(port, listener)