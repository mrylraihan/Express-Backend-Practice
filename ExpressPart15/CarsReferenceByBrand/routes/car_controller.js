const express = require('express')
const router = express.Router()

const Car = require('../models/car')

router.get('/', (req,res)=>{
    Car.find()
        .populate('brandBy')
        .select('-__v -createdAt -updatedAt')
    .then(listOfCars => res.json(listOfCars))
    .catch(err=>res.json(err))
})
router.get('/:id', (req,res)=>{
    const id = req.params.id
    Car.findById(id)
    .select('-__v -createdAt -updatedAt')
    .then(brand=>res.json(brand))
    .catch(err=>res.json(err))
})
router.get('/brand/:brandId', (req,res)=>{
    const brandId = req.params.brandId
    Car.find({ brandBy: brandId })
    .populate('brandBy')
    .select('-__v -createdAt -updatedAt')
    .then(brand=>res.json(brand))
    .catch(err=>res.json(err))
})
router.post('/', (req,res)=>{
    const car = req.body.car
    Car.create(car)
        // .populate('brandBy')
    // .select('-__v -createdAt -updatedAt')
    .then(brand=>res.json(brand))
    .catch(err=>res.json(err))
})
router.patch('/:id', (req,res)=>{
    const id = req.params.id
    const body = req.body
    Car.findByIdAndUpdate(id,body, {new:true})
    // .select('-__v -createdAt -updatedAt')
    .populate('brandBy')
    .then(car=>res.json(car))
    .catch(err=>res.json(err))
})
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Car.findByIdAndDelete(id)
        .select('-__v -createdAt -updatedAt')
        .then(car => res.json(car))
        .catch(err => res.json(err))
})


module.exports = router