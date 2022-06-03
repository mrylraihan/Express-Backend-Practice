const express = require('express')
const router = express.Router()

const Name = require('../models/names')

router.get('/', (req, res)=>{
    // res.json({message:'im working'})
    Name.find()
    .then(nameList=> {res.status(201).json(nameList)})
    .catch(err=>res.json(err))
})

router.post('/', (req, res)=>{
    Name.create(req.body.name)
    .then(newName=>{
        res.json(newName)
    })
    .catch(err=>{
        res.json(err)
    })
})

module.exports = router