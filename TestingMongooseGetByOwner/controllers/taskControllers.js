const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/', (req, res) => {
    Task.find().select('-__v')
    .then(task=>res.json(task))
    .catch(err=>res.json(err))
})



router.get('/:id', (req, res)=>{
    const id = req.params.id
    Task.find({owner:id})
        .then(task => res.json(task))
        .catch(err => res.json(err))
})

router.get('/getall/allbyowner', (req, res) => {
    const id = req.body.id
    Task.find({ owner: id })
        .then(task => res.json(task))
        .catch(err => res.json(err))
})

module.exports = router