const express = require('express')
const router = express.Router()

const Pilot = require('../models/pilot')

router.get('/', (req, res)=>{
    Pilot.find().select('-__v')
    .then(pilotList=>{
        res.json(pilotList)
    })
    .catch(err=>res.json(err))
})
router.get('/:id', (req, res)=>{
    const id = req.params.id
    Pilot.findById(id).select('-__v')//will convert the id to _id
    .then(pilotList=>{
        res.json(pilotList)
    })
    .catch(err=>res.json(err))
})

router.post('/', (req, res) => {
    const pilotInput = req.body
    Pilot.create(pilotInput)
        .then(pilot => {
            res.json(pilot)
        })
        .catch(err => res.json(err))
})
// router.put('/:id', (req, res)=>{
//     const id = req.params.id
//     const pilotInput = req.body
//     Pilot.findByIdAndUpdate({_id:id}, pilotInput, {new: true})
//     .then(newPilot=>res.json(newPilot))
//     .catch(err=>res.json(err))
// })
router.put('/:id', (req, res)=>{
    const id = req.params.id
    const pilotInput = req.body
    Pilot.findByIdAndUpdate(id, pilotInput, {new: true})
    .then(newPilot=>res.json(newPilot))
    .catch(err=>res.json(err))
})
// router.patch('/:id', (req, res) => {
//     Pilot.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
//         .then(newUser => res.json(newUser))
//         .catch(err => res.json(err))

// })

router.delete('/:id', (req, res) => {
    Pilot.findOneAndDelete({ _id: req.params.id })
        .then(pilot => res.json(pilot))
        .catch(err => re.json(err))
})

module.exports = router