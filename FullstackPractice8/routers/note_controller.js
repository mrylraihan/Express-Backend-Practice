const express = require('express')
const router = express.Router()

const Note = require('../models/note')

router.get('/', (req, res)=>{
    // res.json({message:'router works'})
    Note.find()
    .then(notes=>res.json(notes))
    .catch(error=>res.json(error))
})
router.get('/:id', (req, res)=>{
    const id = req.params.id
    // res.json({message:'router works'})
    Note.findById(id)
    .then(notes=>res.json(notes))
    .catch(error=>res.json(error))
})

router.post('/', (req, res)=>{
    const noteInput = req.body.note
    Note.create(noteInput)
    .then(note=>res.json(note))
    .catch(error=>res.json(error))
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id
    Note.findByIdAndDelete(id)
    .then(result=>res.json(result))
    .catch(error=>res.json(error))
})



module.exports = router