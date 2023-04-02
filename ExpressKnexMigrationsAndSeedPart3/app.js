const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 4000

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const userController = require('./controllers/user_controller')
app.use('/user', userController)
const todoController = require('./controllers/todos_controller')
app.use('/todo', todoController)
const one_Many_Controller = require('./controllers/onetomany_contorller')
app.use('/om', one_Many_Controller)


app.get('/', (req, res)=>res.json({message:'its running'}))

app.use((req, res)=>res.json({message:'sorry no route'}))

const listener = ()=>console.log(`we are live on port ${PORT}`)

app.listen(PORT, listener)

module.exports = app