const express = require('express');
const app = express();
const PORT = 4000;

const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// The way middleware works is that it will run between every request/response
// we need to pass next as an parameter so we can use it in the cb, next says move on 
// to the next function, if we res.json() it would end the request, when we use res its 
// like a return for our request 
app.use((req,res, next)=>{
    console.log({message:"First MiddleWare"})//if this was a res.json it would error
    // res.json({message:"First middleware"})
    next()//with out this we wont complete our request 
})

app.get('/', (req, res, next)=>{
    res.json({message:"First Route!"})
    next(10)
    // next("test")
})
// the first argument will be the data that we passed 
// into our next methods in our routes
app.use((log,req,res,next)=>{
    if(typeof log == 'string'){
        console.log(log)
    }else{
        // we can pass the data through to the next middleware function 
        next(log)
    }

})

app.use((number, req, res, next) => {
        console.log(number)
        // next()
})
app.use((req,res)=>res.json({message:"No Route Found!"}))

const listener = ()=>console.log('we are running on PORT: '+PORT)
app.listen(PORT, listener)