const express = require('express')
const router = express.Router()

const Person = require('../models/person')

router.get('/findAll/', (req, res)=>{
    // Person.find({ _id:'617dd59d3adc3278d693e8fc'})//will return the one with the id in array form and any other person with that id 
    Person.find()//will return both freds
        .then(allPeople =>res.json(allPeople))
        .catch(err=>res.json({error:err}))
})
router.get('/findByCriteria/:name', (req, res)=>{
    Person.find({ firstName:req.params.name})//will return both freds in array
        .then(allPeople =>res.json(allPeople))
        .catch(err=>res.json({error:err}))
})
router.get('/findOne/:name', (req, res)=>{
    Person.findOne({ firstName:req.params.name})//will return first fred in a object
        .then(allPeople =>res.json(allPeople))
        .catch(err=>res.json({error:err}))
})
router.get('/findById/:id', (req, res)=>{
    Person.findById({_id:req.params.id})//will return 1 by id in an object
        .then(allPeople =>res.json(allPeople))
        .catch(err=>res.json({error:err}))
})

router.post('/', (req, res)=>{
    Person.create(req.body)//req.body will take data passed in from the body, params will do it from the url
    .then(newPerson=>res.json(newPerson))
    .catch(err => res.json({ error: err }))
})

router.put('/:id', (req, res)=>{
    Person.findByIdAndUpdate(req.params.id,req.body, {new:true} )
    .then(person=>res.json(person))
        .catch(err => res.json(err))
})

module.exports = router