const express = require('express')
const router = express.Router()

const Task = require('../models/task')

router.get('/', (req, res)=>{
    Task.find()
    .populate('owner')
    .then(taskList=>res.json(taskList))
    .catch(err=>res.json(err))
})
router.get('/:ownerId', (req, res)=>{
    const ownerId = req.params.ownerId
    Task.find({owner: ownerId})
    .populate('owner')
    .then(task=>res.json(task))
    .catch(err=>res.json(err))
})

router.post('/', (req, res)=>{
    const task = req.body.task
    Task.create(task)
    .then(task=>res.json(task))
    .catch(err=>res.json(err))
})

router.patch('/:taskId', (req,res)=>{
    const taskId = req.params.taskId
    const newTask = req.body.task

    // Task.findByIdAndUpdate(taskId)
    // .then(task=>{
    //     newTask.owner = task.owner
    //     return task.updateOne(newTask)
    // })
    // .then(updatedTask=>res.json(updatedTask))
    // .catch(err => res.json(err))
    Task.findByIdAndUpdate(taskId, newTask, { new: true })
        .then(newTask => res.json(newTask))
        .catch(error => res.json(error))
})

router.delete('/:taskId', (req,res)=>{
    const taskId = req.params.taskId
    Task.findByIdAndDelete(taskId)
    .then(task=>res.json(task))
    .catch(err => res.json(err))
})
module.exports = router