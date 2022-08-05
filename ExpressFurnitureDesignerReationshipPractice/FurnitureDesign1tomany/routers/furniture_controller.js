const express = require('express')
const Furniture = require('../models/furniture')
const router = express.Router()

// get all
router.get('/', (req, res)=>{
    Furniture.find()
    .then(furnitureList=>res.json(furnitureList))
    .catch(err=>res.json(err))
})
// get by id
router.get('/:id', (req, res)=>{
    const id = req.params.id
    Furniture.findById(id)
    .then(furniture=>res.json(furniture))
    .catch(err=>res.json(err))
})
router.post('/', (req, res)=>{
    const furniture = req.body.furniture
    Furniture.create(furniture)
    .then(createdPiece=>res.json(createdPiece))
    .catch(err=>res.json(err))
})
//delete by id
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Furniture.findByIdAndDelete(id)
        .then(furniture => res.json(furniture))
        .catch(err => res.json(err))
})

module.exports = router;