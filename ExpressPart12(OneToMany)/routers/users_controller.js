const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', (req, res) => {
    User.find().populate('notes').select('-__v')
        .then(userList => res.json(userList))
        .catch(err => res.json(err))
})

router.get('/:id', (req, res)=>{
    User.findById(req.params.id).populate('notes')
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})

router.post('/',(req, res)=>{
    User.create(req.body)
    .populate('notes')
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})

//this will replace/update a field depending if is there or not
// router.patch('/:id', (req,res)=>{
//     User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
//         .then(newUser => res.json(newUser))
//         .catch(err => res.json(err))
// })
router.put('/:id', (req,res)=>{
    User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .populate('notes')
        .then(newUser => res.json(newUser))
        .catch(err => res.json(err))
})

router.patch('/:userId', (req,res)=>{
                            //this is the user id   , this is the notes array you can push one or many  
    User.findByIdAndUpdate({ _id: req.params.userId }, {$push:{notes:req.body.noteId}}, { new: true })
    .populate('notes')
        .then(newUser => res.json(newUser))
        .catch(err => res.json(err))
})

router.delete('/removeNote', (req, res) => {
    const ownerId = req.body.ownerId
    const noteId = req.body.noteId
    User.findByIdAndUpdate(ownerId,
        { $pull: { notes: noteId } },
        { new: true })
        .then(updatedUser => {
            res.json(updatedUser)
        })
        .catch(err => res.json(err))
})

router.delete('/:id', (req,res)=>{
    User.findByIdAndDelete({_id:req.params.id})
    // User.findByIdAndDelete(req.params.id)
    .then(isDeleted=>res.json(isDeleted))
    .catch(err=>res.json(err))
})

module.exports = router