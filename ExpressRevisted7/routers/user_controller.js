const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', (req, res)=>{
    User.find()
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})
router.post('/', (req, res)=>{
    const user = req.body
    User.create(user)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

module.exports = router