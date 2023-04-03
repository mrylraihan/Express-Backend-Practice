const express = require('express')
const router = express.Router()

const MobileSuit = require('../models/mobilesuit')

// .select and populate give you the power to decide what you want to show 
router.get('/', (req, res) => {
    MobileSuit.find().select('-__v')
        .populate("pilotedBy", '-__v')
        // .populate("pilotedBy", '-series')
        .then(gundamList => res.json(gundamList))
        .catch(err => res.json(err))
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    MobileSuit.findById(id).select('-__v')
        .populate("pilotedBy", '-__v')
        .then(gundamList => res.json(gundamList))
        .catch(err => res.json(err))
})

router.get('/pilot/:pilotId', (req, res) => {
    const pilotId = req.params.pilotId
    MobileSuit.find({ pilotedBy: pilotId }).select('-__v')
        .populate("pilotedBy", '-__v')
        .then(gundamList => res.json(gundamList))
        .catch(err => res.json(err))
})



// router.post('/', (req, res) => {
//     const gundamInput = req.body
//     MobileSuit.create(gundamInput)
//         .then(gundamList => res.json(gundamList))
//         .catch(err => res.json(err))
// })
router.post('/', (req, res) => {
    const gundamInput = req.body
    MobileSuit.create(gundamInput)
        .then(gundam => {
            // res.json(gundam)
            res.redirect(`/mobileSuit/${gundam._id}`)
        })
        .catch(err => res.json(err))
})

router.patch('/:id', (req, res) => {
    const id = req.params.id
    const gundamInput = req.body
    MobileSuit.findByIdAndUpdate(id, gundamInput, {new:true})
        .then(gundam => {
            // res.json(gundam)
            res.redirect(`/mobileSuit/${gundam._id}`)
        })
        .catch(err => res.json(err))
})
router.put('/:id', (req, res) => {
    const id = req.params.id
    const gundamInput = req.body
    MobileSuit.findByIdAndUpdate(id, gundamInput, {new:true})
        .then(gundam => {
            // res.json(gundam)
            res.redirect(`/mobileSuit/${gundam._id}`)
        })
        .catch(err => res.json(err))
})
router.delete('/:id', (req, res) => {
    const id = req.params.id
    MobileSuit.findByIdAndDelete(id)
        .then(gundam => {
            res.json(gundam)
        })
        .catch(err => res.json(err))
})


module.exports = router