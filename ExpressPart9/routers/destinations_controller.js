const express = require('express')
const router = express.Router()
const Destination = require('../models/destination')

router.get('/', (req, res)=>{
    Destination.find()
        .then(destination => res.json(destination))
        .catch(err=>req.json(err))
})

router.get('/:id', (req, res)=>{
    const id = req.params.id
    Destination.findOne(id)
        .then(destination => res.json(destination))
        .catch(err=>req.json(err))
})

router.post('/', (req,res)=>{
    Destination.create(req.body)
    .then(newDestination=>res.json(newDestination))
    .catch(err=>res.json(err))
})

router.put('/:id', (req,res)=>{
    Destination.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true})
    .then(newDes=>res.json(newDes))
    .catch(err=>res.json(err))
})

router.delete('/:id', (req,res)=>{
    Destination.findOneAndDelete({_id:req.params.id})
    .then(deleteDes=>res.json(deleteDes))
    .catch(err=>res.json(err))
})




module.exports = router