// require express to create and express methods to create a server 
const express = require('express');
// require mongoose to connect and communicate with mongo db
const mongoose = require('mongoose');
// use express method to invoke express
const app = express();
// create our port number variable to run our express app
const port = 4000;
// making sure our request and responses run through this middle wear 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// set db connection 
mongoose.connect('mongodb://localhost/vacations_db')

const destinationsController = require('./routes/destinations_controller')
app.use('/destinations', destinationsController)

app.get('/', (req, res)=>{
    res.send('hey im working')
})

const listener = ()=>{
    console.log(`Listening on port ${port}`);
}

app.listen(port, listener)