const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const db = require('./config/db')
const userRoutes = require('./routes/user_routes')
const eventRoutes = require('./routes/event_routes')

// require our auth middle ware so we can initialize passport with the bearer token strategy
const auth = require('./lib/auth')
//require our custom logger
const requestLogger = require('./lib/request_logger')//you dont need you can import morgan 
//require custom error handler
const errorHandler = require('./lib/error_handler')

//connect to mongoose with our db in our config file
//or
//mongoose.connect(db)
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors())
// parse incoming request with content type json, and makes there data available on there body 
// req.body
app.use(express.json())

// parse incoming request made by jquery ajax method
// and makes there data available on there body (req.body)

app.use(express.urlencoded({ extended: true }))
// we want to register our auth middleware before we send any request  
app.use(auth)

// register our request logger before any request occur
app.use(requestLogger)

// app.get('/', (req, res) => res.json({ message: 'im working!' }))
app.use(userRoutes)
app.use(eventRoutes)

//use our error handler after our request have been made

app.use(errorHandler)
const port = 4000
app.listen(port, () => console.log('pouring some tea into our port ' + port))
