const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = 4000


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/chores_db')

const choresController = require('./routers/chores_controllerAsync')
app.use('/chores', choresController)
app.get('/', (req, res) => {
    res.json({ message: 'im working' })
})

app.use((req, res) => {
    res.json({ message: 'route not found' })
})

const listener = () => {
    console.log('app is running on port ' + PORT)
}

app.listen(PORT, listener)