const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/', (req, res)=>{
    Task.find()
    .then(taskList=>res.json(taskList))
    .catch(err=>res.json(err))
})

router.post('/', (req,res)=>{
    const task = req.body.task
    Task.create(task)
    .then(newTask=>res.json(newTask))
    .catch(err => res.json(err))
})

router.delete('/:id', (req, res)=>{
    Task.findByIdAndDelete({_id: req.params.id})
    .then(deletedTask=>res.json(deletedTask))
    .catch(err=> res.json(err))
})




module.exports = router
