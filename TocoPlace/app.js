const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const toppingsController = require('./routers/toppings_controller')

app.use('/toppings', toppingsController)

app.use((req,res,next)=>{
    // if(req.method === "POST"){
    if(res.statusCode === 204){
        console.log('we have a new topping')
        res.redirect('/toppings')
    }else{
        // res.status(404).send("Cant find your route")
        next()
    }
})

app.use((err,req,res,next)=>{
    let errorStatusCode = err.status || 500;
    let errorMessage = err.customMessage || "There was an issue"

    res.status(errorStatusCode)
    res.json({status:errorStatusCode, message:errorMessage})
})

app.use((req,res)=>{
    res.status(404).send("Cant find your route")
})


app.listen(PORT, ()=>{console.log('im working on Port :'+PORT)})