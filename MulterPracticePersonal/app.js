const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const bodyParser = require('body-parser')
mongoose.connect('mongodb://localhost/image-crud2')

const fs = require('fs')
// const path = require('path')

const Image = require('./models/image') 

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
// const imageController = require('./routers/image_controller')
// app.use('/image', imageController)
app.get('/', (req, res) => {
    res.send('hey lets get started!')
})

app.get('/images', (req, res)=>{
    Image.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
app.post('/images', upload.single('image'),(req,res, next)=>{
    // const obj = {
    //     title:req.body.title,
    //     path: req.file.path,
    //     image:{
    //         data:fs.readFileSync('uploads/', req.file.filename),
    //         contentType: 'image/jpeg'
    //     }
    const obj = {
        title: req.body.title,
        path: req.file.path,
        image: {
            data: fs.readFileSync('uploads/'+ req.file.filename),
            contentType: 'image/jpeg'
        }
    }
    Image.create(obj)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

// start app
app.listen(4000, () => console.log('Example app listening on port 4000!'))


//https://www.youtube.com/watch?v=NzROCbkvIE0

//22 minutes in 