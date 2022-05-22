const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())
app.use(morgan('short'))

const db = require('./config/db')

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})



const exampleController = require('./app/routes/example_routes')
app.use('/example', exampleController)

app.get('/', (req, res) => {
    res.json({ message: `check out our gundams!` }) // this an array 
})

// ErrorHandling
app.use((err, req, res, next) => {
    console.log("<<Opps mybad lets fix it!>>");
    next(err, req, res, next)
})


app.use((err, req, res, next) => {
    const errorStatusCode = err.status || 500;
    const errorMessage = err.customMessage || "There was an issue";
    res.status(errorStatusCode).json({ status: errorStatusCode, message: errorMessage })

})

app.use((req, res) => {
    res.status(404).json({ error: `sorry we cant find what you are looking for!` })
})


const port = 4000
app.listen(port, () => {
    console.log(`Listening to that sweet Example routes noise on port ${port}`);
})

module.exports = app;