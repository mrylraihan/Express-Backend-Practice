const express = require('express')
const router = express.Router()

const Task = require('../models/task')

// find all
router.get('/',(req, res)=>{
    Task.find()
    .then(taskList=>res.json(taskList))
    .catch(err=>res.json(err))
})
// find by id
router.get('/:id',(req, res)=>{
    const id = req.params.id
    Task.findById(id)
    .then(taskList=>res.json(taskList))
    .catch(err=>res.json(err))
})
// create one
router.post('/',(req,res)=>{
    const task = req.body
    Task.create(task)
    .then(newTask=>res.json(newTask))
    .catch(err=>res.json(error))
})
// update one 
router.patch('/:id',(req,res)=>{
    const id = req.params.id
    const task = req.body
    Task.findByIdAndUpdate(id, task, { new: true })
    .then(newTask=>res.json(newTask))
    .catch(error=>res.json(error))
})
// update one
router.put('/:id',(req,res)=>{
    const id = req.params.id
    const task = req.body.task
    Task.findByIdAndUpdate(id, task, { new: true })
    .then(newTask=>res.json(newTask))
    .catch(error=>res.json(error))
})

// find by id
router.delete('/:id',(req, res)=>{
    const id = req.params.id
    Task.findByIdAndDelete(id)
    .then(deletedTask=>res.json(deletedTask))
    .catch(err=>res.json(err))
})



module.exports = router