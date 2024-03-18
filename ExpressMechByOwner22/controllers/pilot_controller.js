const express = require('express')
const router = express.Router()
const Pilot = require('../models/pilot')

router.get('/', (req, res) => {
    Pilot.find().select('-__v')
        .then(pilotList => {
            res.json(pilotList)
        })
        .catch(err => res.json(err))
})

router.post('/', (req, res) => {
    const pilotInput = req.body
    Pilot.create(pilotInput)
        .then(pilot => {
            res.json(pilot)
        })
        .catch(err => res.json(err))
})

module.exports = router