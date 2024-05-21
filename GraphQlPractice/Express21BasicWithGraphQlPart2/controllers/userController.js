const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) =>{
    const allData = await User.find()
    res.json(allData)
})
router.get('/:id', async (req, res) =>{
    const allData = await User.findById(req.params.id)
    res.json(allData)
})
router.post('/', async (req, res) =>{
    console.log(req.body)
    const allData = await User.create(req.body)
    res.json(allData)
})


module.exports = router