const express = require('express')
const router = express.Router()

const WorkOut = require('../models/workout')

router.get('/', (req, res) => {
    WorkOut.find()
        .select('-__v -createdAt -updatedAt')
        .then(workouts => res.json(workouts))
        .catch(err => res.json(err))
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    WorkOut.findById(id)
        .select('-__v -createdAt -updatedAt')
        .then(workouts => res.json(workouts))
        .catch(err => res.json(err))
})
router.post('/', (req, res) => {
    const workOut = req.body
    WorkOut.create(workOut)
        .then(workouts => res.json(workouts))
        .catch(err => res.json(err))
})
router.patch('/:id', (req, res) => {
    const id = req.params.id
    const updatedBody = req.body
    WorkOut.findByIdAndUpdate(id, updatedBody,{new:true})
        .then(workouts => res.json(workouts))
        .catch(err => res.json(err))
})
router.delete('/:id', (req,res)=>{
    const id = req.params.id
    WorkOut.findByIdAndDelete(id)
    .then(workouts => res.json(workouts))
    .catch(err => res.json(err))
})

module.exports = router