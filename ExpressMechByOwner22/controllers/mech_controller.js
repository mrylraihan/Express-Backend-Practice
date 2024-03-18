const express = require('express')
const router = express.Router()
const Mech = require('../models/mech')

router.get('/', (req, res) => {
    Mech.find().select('-__v').populate('pilotedBy','-__v')
        .then(mechList => {
            res.json(mechList)
        })
        .catch(err => res.json(err))
})

router.post('/', (req, res) => {
    const mechInput = req.body
    Mech.create(mechInput)
        .then(mech => {
            res.json(mech)
        })
        .catch(err => res.json(err))
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const gundamInput = req.body
    Mech.findByIdAndUpdate(id, gundamInput, { new: true })
        .then(gundam => {
            res.json(gundam)
            // res.redirect(`/mobileSuit/${gundam._id}`)
        })
        .catch(err => res.json(err))
})

module.exports = router