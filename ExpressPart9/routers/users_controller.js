const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', (req,res)=>{
    User.find()
    .populate('destination_visited')
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})

router.get('/:id', (req,res)=>{
    const id = req.params.id
    User.findOne(id)
    .populate('destination_visited')
    .then(user=>{
        res.json(user)
        // res.redirect(301,'/users')
    })
    .catch(err=>res.json(err))
})

router.post('/', (req,res)=>{
    const inputUser = req.body
    User.create(inputUser)
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})

router.put('/:id', (req,res)=>{
    const id = req.params.id
    User.findByIdAndUpdate(id, req.body, {new:true})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})

router.put('/:user_id/destination', (req,res)=>{
    const userId = req.params.user_id
    const destinationId = req.body.destination_id
    User.findByIdAndUpdate(userId,
       {$push:{destination_visited: destinationId}},
       {new:true} 
    ).populate('destination_visited')
        .then(updatedUser=>res.json(updatedUser))
        .catch(err=>res.json(err))
})
router.delete('/:user_id/destination/:destination_id', (req,res)=>{
    const userId = req.params.user_id
    const destinationId = req.params.destination_id
    User.findByIdAndUpdate(userId,
       {$pull:{destination_visited: destinationId}},
       {new:true} 
        )
        .then(updatedUser=>res.json(updatedUser))
        .catch(err=>res.json(err))
})

router.delete('/:id', (req,res)=>{
    User.findOneAndDelete({_id:req.params.id})
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})
module.exports = router