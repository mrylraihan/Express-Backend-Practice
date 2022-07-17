const express = require('express')
const mongoose = require('mongoose')
//cors 
const cors = require('cors')
const morgan = require('morgan')
// Invoke our express and create our port
const app = express()
const port = 4001

//setting up our middleware 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('short'))
app.use(cors())

// setting up our db connection
mongoose.connect('mongodb://localhost/task_db_practice')
const taskController = require('./routers/tasks_controllers')
app.use('/task', taskController)
app.get('/', (req, res)=>{
    res.json({message:'im working'})
})

const listener =()=>{
    console.log(`hey all we are now listening to that smooth jazz on ${port}`);
}

app.listen(port, listener)