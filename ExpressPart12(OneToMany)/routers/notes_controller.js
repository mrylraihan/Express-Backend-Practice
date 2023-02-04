const express = require('express')
const router = express.Router()

const Note = require('../models/note')

router.get('/', (req, res) => {
    Note.find().select('-__v')
        .then(noteList => res.json(noteList))
        .catch(err => res.json(err))
})
// router.get('/:id', (req, res) => {
//     Note.find({_id:req.params.id}).select('-__v')
//         .then(noteList => res.json(noteList[0]))
//         .catch(err => res.json(err))
// })
router.get('/:id', (req, res) => {
    Note.findById(req.params.id).select('-__v')
        .then(note => res.json(note))
        .catch(err => res.json(err))
})
// router.get('/:title', (req, res) => {
//     Note.findOne({title:req.params.title}).select('-__v')
//         .then(note => res.json(note))
//         .catch(err => res.json(err))
// })

router.post('/', (req,res)=>{
    Note.create(req.body)
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

router.put('/:id', (req,res)=>{
    Note.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})

router.delete('/:id', (req,res)=>{
    Note.findByIdAndDelete(req.params.id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
})


module.exports = router