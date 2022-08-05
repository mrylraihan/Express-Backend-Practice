const express = require('express')
const router = express.Router()
const Designer = require('../models/designer')

// get all
router.get('/', (req, res)=>{
    Designer.find()
        .populate('designedFurniture')
        .then(designerList=>res.status(201).json(designerList))
        .catch(err=>res.json(err))
})
//get by id
router.get('/:id', (req, res)=>{
    const id = req.params.id
    Designer.findById(id)
        .populate('designedFurniture')
        .then(designerList=>res.status(201).json(designerList))
        .catch(err=>res.json(err))
})
//create a designer 
router.post('/',(req, res)=>{
    const designer = req.body
    Designer.create(designer)
        .then(newDesigner=>res.status(201).json(newDesigner))
        .catch(err => res.json(err))
})
//adding furniture the designer designed 
router.put('/', (req, res)=>{
    const designerId = req.body.designerId
    const furnitureId = req.body.furnitureId
    Designer.findByIdAndUpdate(designerId, 
        {$push:{designedFurniture:furnitureId}}, {new:true})
        .populate('designedFurniture')
        .then(updatedDesigner=>res.json(updatedDesigner))
        .catch(err => res.json(err))
})

// removing a piece of furniture from the designers array of designed furniture 
router.delete('/remove', (req, res)=>{
    const designerId = req.body.designerId
    const furnitureId = req.body.furnitureId
    Designer.findByIdAndUpdate(designerId, 
        { $pull: { designedFurniture : furnitureId}},
        {new:true})
        .then(updatedDesigner=>{
            res.json(updatedDesigner)
        })
        .catch(err => res.json(err))
})

//delete a designer 
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Designer.findByIdAndDelete(id)
        // .populate('designedFurniture')
        .then(designerList => res.status(201).json(designerList))
        .catch(err => res.json(err))
})


module.exports = router;