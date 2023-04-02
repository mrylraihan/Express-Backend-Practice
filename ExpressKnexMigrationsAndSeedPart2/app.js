const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 4000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


const artistsController = require('./controllers/artists_controller')
app.use('/artist', artistsController)
const songsController = require('./controllers/songs_controller')
app.use('/songs', songsController)
const artistSongsController = require('./controllers/artistsSongs_controller')
app.use('/double', artistSongsController)

app.get('/', (req, res) => {
    res.json({ message: 'im working' })
})

// if route is not found 
app.use((req, res) => {
    res.status(404).json({ error: 'no route found' })
})

const listener = () => console.log(`now jamming to that sweet sweet sounds from port ${PORT}`);

app.listen(PORT, listener)