const express = require('express')
const app = express()
const cors = require('cors')
const port = 4000;

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json());

const postController = require('./routes/postRoutes');

app.use('/post', postController)

app.get('/', (req, res)=>{
    res.json({message:"We are live"})
})

const listener = ()=>console.log(`Jamming on PORT:${port}`)

app.listen(port, listener)