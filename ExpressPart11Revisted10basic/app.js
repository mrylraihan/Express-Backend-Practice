// require express to create and express methods to create a server 
const express = require('express');
// require mongoose to connect and communicate with mongo db
const mongoose = require('mongoose');
// use express method to invoke express
const cors = require('cors')
const app = express();
// create our port number variable to run our express app
const port = 4000;

// making sure our request and responses run through this middle wear 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect('mongodb://localhost/chores_db')

const choreController = require('./routers/chores_controller')
app.use('/chores', choreController)

app.get('/', (req, res) => {
    res.send('hey im working')
})

app.use((req, res)=>{
    res.status(400).json({message:'no route found'})
})

const listener = () => {
    console.log(`Listening on port ${port}`);
}

app.listen(port, listener)