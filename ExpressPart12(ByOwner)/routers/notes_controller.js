const express = require('express')
const router = express.Router()

const Note = require('../models/notes')

router.get('/coming', (req,res)=>{
    res.json({notes:'notesComing'})
})
router.get('/', (req,res)=>{
   Note.find().populate('owner')
   .then(notes=>res.json(notes))
   .catch(err=>res.json(err))
})
router.get('/owner', (req,res)=>{
   Note.find({owner:req.body.id}).populate('owner')
   .then(notes=>res.json(notes))
   .catch(err=>res.json(err))
})
router.get('/:id', (req,res)=>{
    Note.findById(req.params.id)//will return an array of objects that have a matching 
    .then(note=>res.json(note))
    .catch(err=>res.json(err))
})
// router.get('/:id', (req,res)=>{
//     Note.findById({_id:req.params.id})//will return an array of objects that have a matching 
//     .then(note=>res.json(note))
//     .catch(err=>res.json(err))
// })
// router.get('/:id', (req,res)=>{
//     Note.findOne({_id:req.params.id})//will return an object that have a matching _id 
//     .then(note=>res.json(note))
//     .catch(err=>res.json(err))
// })
// router.get('/:id', (req,res)=>{
//     Note.find({_id:req.params.id})//will return an array of objects that have a matching 
//     .then(note=>res.json(note))
//     .catch(err=>res.json(err))
// })

router.post('/', (req,res)=>{
   Note.create(req.body)
   .then(notes=>res.json(notes))
   .catch(err=>res.json(err))
})

router.put('/:id', (req,res)=>{
    Note.findByIdAndUpdate(req.params.id, req.body,{new:true})
    .then(newNote=>res.json(newNote))
    .catch(err=>res.json(err))
})
router.patch('/:id', (req,res)=>{
    Note.findByIdAndUpdate(req.params.id, req.body.owner,{new:true})
    .then(newNote=>res.json(newNote))
    .catch(err=>res.json(err))
})

router.delete('/:id', (req, res)=>{
    Note.findByIdAndDelete(req.params.id)
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
module.exports = router