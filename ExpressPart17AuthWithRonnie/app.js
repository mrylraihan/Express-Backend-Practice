const express = require('express')
const cors = require('cors')
// const mongoose = require('mongoose')
const app = express()

const PORT = 9122

require('./config/mongoose.config')
require('dotenv').config()

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/testdbI')

const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(cors({credentials:true, origin:'http://localhost:3000'}))

const userRoutes = require('./routes/user.routes')
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/user', userRoutes)

app.listen(PORT, ()=>console.log('server is running on PORT:'+PORT))