const express = require('express')
const app = express()

const PORT = 4000;
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// This will run when ever a request is made
app.use((req,res, next)=>{
    console.log("first middleWare")
    next()
})

app.get('/', (req,res, next)=>{
    console.log('first route before next')
    next({message2:"Second Middleware", message3:"Third Middleware"})//will hit the second and third middleware logs then return 
    console.log('first route after next')
    res.json({message:"first route!"})
})
app.use((log,req, res, next) => { // need next as a arg to use next()
    // console.log("Second middleWare")
    console.log(log.message2)
    next({...log})//without this you cant reach the next middleware "Third middleware"
})
app.use((log, req, res, next) => {//you need next if you want to be able to access the log data 
    // console.log("Third middleWare")
    console.log(log.message3)
    // next()
    // return 
})
app.use((req,res)=>res.json({message:"Wrong Route"}))

app.listen(PORT, ()=>console.log(`we are live on PORT: ${PORT}`))