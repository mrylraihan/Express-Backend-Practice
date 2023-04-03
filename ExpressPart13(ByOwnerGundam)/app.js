const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const PORT = 4000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


mongoose.connect('mongodb://localhost/mongo_Gundam2')

const pilotController = require('./routers/pilot_controller')
app.use('/pilot', pilotController)

const mobileSuitController = require('./routers/mobilesuit_controller')
app.use('/mobileSuit', mobileSuitController)


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