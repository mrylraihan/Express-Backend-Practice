const express = require('express')
const router = express.Router()

const Brand = require('../models/brand')

router.get('/', (req,res)=>{
    Brand.find()
    .then(listOfBrands=>res.json(listOfBrands))
    .catch(err=>res.json(err))
})
router.get('/:id', (req,res)=>{
    const id = req.params.id
    Brand.findById(id)
    .select('-__v -createdAt -updatedAt')
    .then(brand=>res.json(brand))
    .catch(err=>res.json(err))
})
router.post('/', (req,res)=>{
    const brand = req.body.brand
    Brand.create(brand)
    // .select('-__v -createdAt -updatedAt')
    .then(brand=>res.json(brand))
    .catch(err=>res.json(err))
})
router.patch('/:id', (req,res)=>{
    const id = req.params.id
    const body = req.body
    Brand.findByIdAndUpdate(id,body, {new:true})
    // .select('-__v -createdAt -updatedAt')
    .then(brand=>res.json(brand))
    .catch(err=>res.json(err))
})
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Brand.findByIdAndDelete(id)
        .select('-__v -createdAt -updatedAt')
        .then(brand => res.json(brand))
        .catch(err => res.json(err))
})


module.exports = router