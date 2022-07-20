const express = require('express')
const router = express.Router()

const Furniture = require('../models/furniture')

router.get('/', (req, res)=>{
    Furniture.find()
    .populate('designedBy')
    .then(furnitureList=>res.json(furnitureList))
    .catch(err=>res.json(err))
})
router.get('/:designedBy', (req, res)=>{
    // const designedBy = req.params.designedBy
    const designerID = req.params.designedBy
    Furniture.find({ designedBy:designerID })
    // Furniture.find({ designedBy })
    .populate('designedBy')
    .then(furnitureList=>res.json(furnitureList))
    .catch(err=>res.json(err))
})

router.post('/', (req, res)=>{
    const furniture = req.body.furniture
    Furniture.create(furniture)
    // .populate('designedBy')//wont work because its not a get method
    .then(createdPiece=>res.json(createdPiece))
    .catch(err=>res.json(err))
})
router.delete('/:furnitureID', (req, res)=>{
    const id = req.params.furnitureID
    Furniture.findByIdAndDelete(id)
    .then(deletedFurniture=>res.json(deletedFurniture))
    .catch(err=>res.json(err))
})

module.exports = router