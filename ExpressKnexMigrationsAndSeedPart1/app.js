const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 4000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


const choresController = require('./routes/chores_Controller')
app.use('/chores', choresController)

app.get('/', (req, res) => {
    res.json({ message: 'im working' })
})
// if data or response is corrupt 
app.use((err,req,res,next)=>{
    const errorStatusCode = err.status || 500
    const errorMessage = err.customMessage || 'There was an issue';
    res.status(errorStatusCode).json({status:errorStatusCode,message:errorMessage})
})

// if route is not found 
app.use((req, res) => {
    res.status(404).json({ error: 'no route found' })
})

const listener = () => console.log(`now jamming to that sweet sweet sounds from port ${PORT}`);

app.listen(PORT, listener)