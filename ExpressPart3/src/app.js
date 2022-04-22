// const {nanoid} = require('nanoid')
const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const app = express();
const port = 4000
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('short'))

const gundamController = require('./controllers/gundam_controllers')

app.use('/gundams', gundamController)
// Home page
app.get('/', (req, res)=>{
    res.send(`check out our gundams!`) // this an array 
})

app.listen(port, ()=>{
    console.log(`Listening to that sweet gundam noise on port ${port}`);
})

module.exports = app;