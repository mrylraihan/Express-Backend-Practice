const express = require('express')




// Invoke our express and create our port
const app = express()
const port = 4001

//setting up our middleware 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())




// setting up our db connection
const fruitsList = [
    {name:"apple", color:'red'},
    {name:"orange", color:'orange'},
    {name:"strawberry", color:'red'}
]

app.get('/', (req, res) => {
    res.json({ message: 'im working' })
})
app.get('/fruits', (req, res) => {
    res.send({ fruitsList })
    // res.render('show.ejs')
})
app.get('/fruits/:idxFruit', (req, res) => {
    const pickFruit = fruitsList[req.params.idxFruit]
    res.render('show.ejs',{ fruitsList: pickFruit})
})

app.get('/name/:inputName', (req, res)=>{
    const name = req.params.inputName
    res.render('name.ejs',{name: name})
    // res.json({name:name})
})

const listener = () => {
    console.log(`hey all we are now listening to that smooth jazz on ${port}`);
}

app.listen(port, listener)