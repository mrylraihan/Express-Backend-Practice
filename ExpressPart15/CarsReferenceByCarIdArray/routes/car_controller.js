const express = require('express')
const router = express.Router()

const Car = require('../models/car')

router.get('/', (req, res)=>{
    Car.find()
    .then(cars=>res.json(cars))
    .catch(err=>res.json(err))
})
router.get('/engine/:engineType', (req, res)=>{
    Car.find({ engine :req.params.engineType})
    .then(cars=>res.json(cars))
    .catch(err=>res.json(err))
})
router.get('/:id', (req, res)=>{
    Car.findById(req.params.id)
    .select('-__v -createdAt -updatedAt')
    .then(cars=>res.json(cars))
    .catch(err=>res.json(err))
})
router.post('/', (req, res) => {
    const car = req.body.car
    Car.create(car)
        .then(car => res.json(car))
        .catch(err => res.json(err))
})
router.patch('/:id', (req, res) => {
    const car = req.body
    const id = req.params.id
    Car.findByIdAndUpdate(id,car,{new:true})
        .then(car => res.json(car))
        .catch(err => res.json(err))
})
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Car.findByIdAndDelete(id)
        .then(car => res.json(car))
        .catch(err => res.json(err))
})
module.exports = router