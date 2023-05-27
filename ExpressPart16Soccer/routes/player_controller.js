const express = require('express')
const router = express.Router()

const Player = require('../models/player')

router.get('/', (req, res) => {
    Player.find()
        .populate('trainingReg')
        .then(players => res.json(players))
        .catch(err => res.json(err))
})

router.get('/:id', (req, res) => {
    Player.findById(req.params.id)
        .populate('trainingReg')
        .then(player => res.json(player))
        .catch(err => res.json(err))
})

router.post('/', (req, res) => {
    const player = req.body
    Player.create(player)
        .then(player => res.status(201).json(player))
        .catch(err => res.json(err))
})

router.put('/:id', (req, res) => {
    const playerId = req.params.id
    const workoutId = req.body.workoutId
    Player.findByIdAndUpdate(playerId,
        { $push: { trainingReg: workoutId } }, { new: true })
        .populate('trainingReg')
        .then(UpdatedPlayer => res.json(UpdatedPlayer))
        .catch(err => res.json(err))
})
router.delete('/remove/:id', (req, res) => {
    const playerId = req.params.id
    const workoutId = req.body.workoutId
    Player.findByIdAndUpdate(playerId,
        { $pull: { trainingReg: workoutId } }, { new: true })
        // .populate('trainingReg')
        .then(UpdatedPlayer => res.json(UpdatedPlayer))
        .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
    Player.findByIdAndDelete(req.params.id)
        
        .then(deletedPlayer => res.redirect(302, '/players'))
        .catch(err => res.json(err))
})

module.exports = router