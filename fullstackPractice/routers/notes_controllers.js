const express = require('express')
const router = express.Router()

const Notes = require('../models/notes')

router.get('/', (req, res)=>{
    Notes.find()
    .then(noteList=>res.status(201).json(noteList))
    .catch(err=>res.json(err))
})


router.get('/:id', (req, res) => {
    Notes.findOne({ _id: req.params.id })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})
router.get('/todo/:title', (req, res) => {
    Notes.findOne({ title: req.params.title })
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

router.post('/', (req, res) => {
    Notes.create(req.body.note)
        .then(newNote => res.status(201).json(newNote))
        .catch(err => res.json(err))
})

router.patch('/:id', (req, res) => {
    Notes.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(newNote => res.json(newNote))
        .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
    Notes.findOneAndDelete({ _id: req.params.id })
        .then(deletedNote => res.json(deletedNote))
        .catch(err => res.json(err))
})
module.exports = router