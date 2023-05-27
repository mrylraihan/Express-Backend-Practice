const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', (req, res) => {
    User.find()
        .populate('trainingReg')
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .populate('trainingReg')
        .then(user => res.json(user))
        .catch(err => res.json(err))
})
router.post('/', (req, res) => {
    const user = req.body
    User.create(user)
        .then(player => res.status(201).json(player))
        .catch(err => res.json(err))
})
router.put('/:id', (req, res) => {
    const userId = req.params.id
    //workoutId can be one id or an array of ids
    const workoutId = req.body.workoutId
    // {
    //     "workoutId": ["64720cf56adb4baab86af90a", "64720cf56adb4baab86af90b", "64720cf56adb4baab86af909"]
    // }
    User.findByIdAndUpdate(userId,
        { $push: { trainingReg: workoutId } }, { new: true })
        .populate('trainingReg')
        .then(UpdatedPlayer => res.json(UpdatedPlayer))
        .catch(err => res.json(err))
})
router.delete('/:id', (req, res) => {
    const userId = req.params.id
    //workoutId can be one id or an array of ids
    const workoutId = req.body.workoutId
    // {
    //     "workoutId": ["64720cf56adb4baab86af90a", "64720cf56adb4baab86af90b", "64720cf56adb4baab86af909"]
    // }
    User.findByIdAndUpdate(userId,
        { $pull: { trainingReg: workoutId } }, { new: true })
        .then(UpdatedPlayer => res.json(UpdatedPlayer))
        .catch(err => res.json(err))
})
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)

        .then(deletedUser => res.redirect(302, '/users'))
        .catch(err => res.json(err))
})
module.exports = router
// 64720cf56adb4baab86af909
// 64720cf56adb4baab86af90b