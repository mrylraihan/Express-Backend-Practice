const express = require('express')
const router = express.Router()

const Brand = require('../models/brand')

router.get('/', (req, res)=>{
    Brand.find()
    .populate('carLineUp')
    .then(brandList=>res.json(brandList))
    .catch(err=>res.json(err))
})

router.get('/:id', (req, res)=>{
    Brand.findById(req.params.id)
        .populate('carLineUp')
        .then(brand => res.json(brand))
        .catch(err => res.json(err))
})
router.post('/', (req, res) => {
    const brand = req.body
    Brand.create(brand)
        .then(newBrand => res.status(201).json(newBrand))
        .catch(err => res.json(err))
})
router.put('/:id', (req, res) => {
    const brandId = req.params.id
    const carId = req.body.carId
    Brand.findByIdAndUpdate(brandId,
        { $push: { carLineUp: carId } }, { new: true })
        .populate('carLineUp')
        .then(UpdatedBrand => res.json(UpdatedBrand))
        .catch(err => res.json(err))
})
router.delete('/remove/:id', (req, res) => {
    const brandId = req.params.id
    const carId = req.body.carId
    Brand.findByIdAndUpdate(brandId,
        { $pull: { carLineUp: carId } },
        { new: true })
        .then(UpdatedBrand => {
            res.json(UpdatedBrand)
        })
        .catch(err => res.json(err))
})
router.delete('/:id', (req,res)=>{
    Brand.findByIdAndDelete(req.params.id)
    // .then(deletedBrand=>res.json(deletedBrand))
    .then(deletedBrand=>res.redirect(302,'/brands'))
    .catch(err=>res.json(err))
})

module.exports = router