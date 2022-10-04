const express = require('express')
const cors = require('cors')
// require mongoose to talk to our db
const mongoose = require('mongoose')

// Invoking express to start your server 
// this allows us to access all the methods in express
const app = express()
const PORT = 4000

//Middleware for converting our data 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// middle ware for sending request to other sites
app.use(cors())

// instantiate our db
mongoose.connect('mongodb://localhost/blogs_db_practice')

// require routers and assign them to a route
const blogRouters = require('./routers/blog_controller')

app.use('/blog', blogRouters)

app.get('/', (req, res) => {
    res.json({ message: 'im working!' })
})

const listener = () => {
    console.log('your server is working on ' + PORT);
}

app.listen(PORT, listener)