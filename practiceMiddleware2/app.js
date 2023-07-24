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
    next()//will hit the second and third middleware logs then return 
    console.log('first route after next')
    res.json({message:"first route!"})
})
app.use((req, res, next) => { // need next as a arg to use next()
    console.log("Second middleWare")
    next()//without this you cant reach the next middleware "Third middleware"
})
app.use((req, res) => {
    console.log("Third middleWare")
    // next()
    // return 
})
app.use((req,res)=>res.json({message:"Wrong Route"}))

app.listen(PORT, ()=>console.log(`we are live on PORT: ${PORT}`))