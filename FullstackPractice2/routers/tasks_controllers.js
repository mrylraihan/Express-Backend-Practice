// setting up our router
const express = require('express')
const router = express.Router()

// setting up our model methods 
const Task = require('../models/task')

router.get('/', (req, res) => {
    Task.find()
        .then(taskList => res.status(201).json(taskList))
        .catch(err => res.json(err))
})

router.get('/:id', (req, res)=>{
    Task.findById(req.params.id)
    .then(task=>res.json(task))
    .catch(err=>res.json(err))
})

router.post('/', (req, res)=>{
    const task = req.body.task
    Task.create(task)
        .then(newTask => res.redirect(301, '/task'))//get all back 
        // .then(newTask => res.status(201).json(newTask))//get single object back 
        .catch(err => res.json(err))
})

module.exports = router