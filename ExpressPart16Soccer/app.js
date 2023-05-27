const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')
const port = 4001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

mongoose.connect('mongodb://localhost/soccer_trainingDb')
const userController = require('./routes/user_controller')
const playerController = require('./routes/player_controller')
const workoutController = require('./routes/workout_controller')

app.use('/users', userController)
app.use('/players', playerController)
app.use('/workouts', workoutController)

app.get('/', (req, res) => {
    res.json({ message: 'im working' })
})

const listener = () => {
    console.log(`hey we are running on port ${port}`)
}

app.listen(port, listener)