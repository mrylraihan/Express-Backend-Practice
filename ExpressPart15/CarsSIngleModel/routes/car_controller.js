const express = require('express')
const router = express.Router()

const Cars = require('../models/car')

router.get('/', (req,res)=>{
    Cars.find()
    .then(carList=>res.json(carList))
    .catch(err=>res.json(err))
})
router.get('/:id', (req,res)=>{
    const id = req.params.id
    Cars.findById(id)
        .select('-__v -createdAt -updatedAt')
    .then(car=>res.json(car))
    .catch(err=>res.json(err))
})
router.get('/brand/:brand', (req,res)=>{
    const brand = req.params.brand
    Cars.find({brand:brand})
        .select('-__v -createdAt -updatedAt')
    .then(car=>res.json(car))
    .catch(err=>res.json(err))
})
router.get('/model/:model', (req,res)=>{
    const model = req.params.model
    Cars.find({model})
        .select('-__v -createdAt -updatedAt')
    .then(car=>res.json(car))
    .catch(err=>res.json(err))
})
router.post('/', (req,res)=>{
    const car = req.body.car
    Cars.create(car)
        // .select('-__v -createdAt -updatedAt')
    .then(car=>res.json(car))
    .catch(err=>res.json(err))
})
router.patch('/:id', (req,res)=>{
    const id = req.params.id
    const car = req.body
    Cars.findByIdAndUpdate(id,car,{new:true})
        // .select('-__v -createdAt -updatedAt')
    .then(car=>res.json(car))
    .catch(err=>res.json(err))
})
router.delete('/:id', (req,res)=>{
    const id = req.params.id
    Cars.findByIdAndDelete(id,{new:true})
        // .select('-__v -createdAt -updatedAt')
    .then(car=>res.json(car))
    .catch(err=>res.json(err))
})

module.exports = router