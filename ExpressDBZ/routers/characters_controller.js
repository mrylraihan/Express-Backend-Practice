const express = require('express')
const router = express.Router()

const Character = require('../models/character')
//get all route
router.get('/', (req, res)=>{
    Character.find()
    .then(character=>res.json(character))
    .catch(err=>res.json(err))
})
//post route creating something
router.post('/', (req, res)=>{
    Character.create(req.body.character)
    .then(character=>res.json(character))
    .catch(err=>res.json(err))
})

module.exports = router