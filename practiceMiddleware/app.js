const express = require('express');
const app = express();
const cors = require('cors')

const Port = 4000;

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req, res, next) => {
    console.log('call before')
    // res.json({message:"First"})//if this runs then the next res.json wont
    next()//if we dont have this line then it will never continue 
})

const testController = require('./routers/test_controllers')
app.use('/test', testController)

app.get('/', (req,res)=>res.json({message:"we are live"}))


app.use((log, req, res, next)=>{
    if (log.message) {
        console.log(log.message)
        // res.json({ message: log.message, data: log.data })//this will take all the data and res.json but we dont need to do that
    } 
    else{
        next({...log})//so inorder to use the next middleware with your data you need to pass it in
    }
})

app.use((err,req,res, next)=>{
    console.log('test')
        res.json({errorMessage:err.customMessage})
        // next()
})

app.use((req,res)=>res.json({errorMessage:"Sorry route not found"}))

const listener = ()=>console.log(`we are live on port ${Port}`)
app.listen(Port, listener)