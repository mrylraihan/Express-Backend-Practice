const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 4000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


const userController = require('./controllers/user_controllers')
app.use('/login', userController)

app.get('/', (req, res) => {
    res.json({ message: 'im working' })
})
// if data or response is corrupt 


// if route is not found 
app.use((req, res) => {
    res.status(404).json({ error: 'no route found' })
})

const listener = () => console.log(`now jamming to that sweet sweet sounds from port ${PORT}`);

app.listen(PORT, listener)