const express = require('express')
const router = express.Router()

const Note = require('../models/note')

router.get('/', async (req, res) => {
    const allData = await Note.find().populate('owner')
    res.json(allData)
})

router.get('/:owner', async (req, res) => {
    const allData = await Note.find({ owner: req.params.owner })
    res.json(allData)
})

module.exports = router