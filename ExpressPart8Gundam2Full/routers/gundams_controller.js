const express = require('express')
const req = require('express/lib/request')
const router = express.Router()

const Gundam = require('../models/gundam')
// Get
router.get('/', (req, res)=>{
    Gundam.find()
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
// Get by Id
router.get('/:id', (req, res)=>{
    Gundam.findOne({_id:req.params.id})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
router.get('/:name', (req, res)=>{
    Gundam.findOne({pilot:req.params.name})
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
// Post
router.post('/', (req, res)=>{
    // Gundam.create(req.body)//{name:"tallgeese"}
    Gundam.create(req.body.gundam)//{gundam:{name:"tallgeese"}}
    .then(result=>res.json(result))
    .catch(err=>res.json(err))
})
// edit 
router.put('/:id', (req, res)=>{
    Gundam.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true})
    .then(newMech=>res.json(newMech))
    .catch(err=>res.json(err))
})
// delete
router.delete('/:id', (req, res)=>{
    Gundam.findOneAndDelete({_id:req.params.id}, req.body, {new:true})
    .then(deletedMech=>res.json(deletedMech))
    .catch(err=>res.json(err))
})

module.exports = router