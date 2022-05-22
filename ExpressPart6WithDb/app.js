// require express so we can use express methods
const express = require('express');
// const { default: mongoose } = require('mongoose');

// require mongoose so we can use mongoose connect to connect to our db

const mongoose = require('mongoose')

const app = express()
const port = 4500

app.use(express.urlencoded({extended:true}));
app.use(express.json())

// set db connection 
mongoose.connect('mongodb://localhost/names_db')

// set 
const namesController = require('./routes/names_controller')

app.get('/', (req, res) => {
    res.json({ message: `check out our names!` }) // this an array 
})

app.use('/name', namesController)

const listener = ()=>{
    console.log(`listening to the sweet sounds of port ${port}`);
}

app.listen(port, listener)
