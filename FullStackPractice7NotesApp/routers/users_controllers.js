const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', (req, res)=>{
    User.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

router.get('/usersName/:userN', (req, res)=>{
    const userName = req.params.userN
    User.find({userName:userName})
        .then(users => res.json(users))
            .catch(err => res.json(err))
})

router.get('/usersId/:id', (req, res)=>{
    const id = req.params.id
    User.findById(id)
        .then(users => res.json(users))
        .catch(err => res.json(err))
})

router.post('/', (req, res)=>{
    const body = req.body
    User.create(body)
    .then(user=>res.json(user))
        .catch(err => res.json(err))
})

router.put('/:id', (req, res)=>{
    const userId = req.params.id
    const newUser = req.body.user

    User.findByIdAndUpdate(userId, newUser, {new:true})
    .then(newUser=>res.json(newUser))
    .catch(err=>res.json(err))
})

router.patch('/patch/:id', (req, res)=>{
    const userId = req.params.id
    const newUser = req.body

    User.findByIdAndUpdate(userId, newUser, {new:true})
    .then(newUser=>res.json(newUser))
    .catch(err=>res.json(err))
})

router.delete('/:id',(req, res)=>{
    const userId = req.params.id 
    User.findByIdAndDelete(userId)
    .then(deletedUser=>res.json(deletedUser))
        .catch(err => res.json(err))  
})


module.exports = router