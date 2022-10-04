const express = require('express')
const app = express()

const port = 4000
const arr = [1,2,3,4,5,6,7]
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res)=>{
    res.json({message:'Did I do that?'})
})
app.get('/:num',(req,res)=>{
    const num = req.params.num
    const found = arr.find(ele=>ele==num)
    if(found){
        res.json({found:found})
    }else{
        res.json({found:'sike'})

    }
})

const listener = ()=>{
    console.log(`jamming to that sweet sweet music on port ${port}`);
}

app.listen(port, listener)