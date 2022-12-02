const express = require('express')
const router = express.Router()

const Note = require('../models/note')

router.get('/',(req, res)=>{
    Note.find()
    .populate('owner')
        .then(notes => res.json(notes))
        .catch(err => res.json(err))
})

router.get('/:id',(req, res)=>{
    const id = req.params.id
    Note.findById(id)
        .then(note => res.json(note))
        .catch(err => res.json(err))
})
router.get('/owner/:ownerId', (req, res)=>{
    const ownerId = req.params.ownerId
    Note.find({owner:ownerId})
        .populate('owner')
        .then(notes => res.json(notes))
        .catch(err => res.json(err))
})
// router.get()

router.post('/', (req, res) => {
    const body = req.body
    Note.create(body)
        // .populate('owner')
        .then(notes => res.json(notes))
        .catch(err => res.json(err))
} )

router.put('/:noteId',(req, res)=>{
    const id = req.params.noteId
    const note = req.body.note
    Note.findByIdAndUpdate(id, note, {new:true})
    .then(newNote=>res.json(newNote))
    .catch(err=>res.json(err))
} )
router.patch('/:noteId',(req, res)=>{
    const id = req.params.noteId
    const note = req.body.note
    Note.findByIdAndUpdate(id, note, {new:true})
    .then(newNote=>res.json(newNote))
    .catch(err=>res.json(err))
} )
router.delete('/:id',(req, res)=>{
    const id = req.params.id

    Note.findByIdAndDelete(id)
        .then(delNote => res.json(delNote))
    .catch(err=>res.json(err))
} )



module.exports = router