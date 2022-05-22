const express = require('express')
const req = require('express/lib/request')
const res = require('express/lib/response')

const Example = require('../models/example')

const router = express.Router()


// Get all
router.get('/', (req, res, next) => {
    Example.find().then(result => {
        if (res.json(result).length >= 1) {
            return res.json(result)
        } else {
            return res.json({ message: 'it worked !' })
        }
    })
    // Example.find()
    .then(examples=> res.status(200).json(examples))
    .catch(next)
})

//Get by ID
// what ever we put in our route meaning what ever we name it will reflect in the req.params
// example /:monkey now we have to get access to that in the req.params with monkey req.params.monkey
router.get("/:id", (req, res, next)=>{
    Example.findOne({_id:req.params.id})
    .then(example=>{
        return res.status(200).json(example)
    }).catch(next)
})

// POST /examples
router.post('/', (req, res, next) => {
    // set owner of new example to be current user
    // if you have an object body.example you need to send an example object 
    // {example:{key:value, key:value}}
    Example.create(req.body.example)
        // respond to succesful `create` with status 201 and JSON of new "example"
        .then(example => {
            res.status(201).json({ example })
        })
        // if an error occurs, pass it off to our error handler
        // the error handler needs the error message and the `res` object so that it
        // can send an error message back to the client
        .catch(next)
})

router.put('/:id', (req, res, next)=>{
    Example.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(example => res.status(201).json(example))
    .catch(next)

})
router.delete('/:id', (req, res, next)=>{
    Example.findByIdAndDelete({_id: req.params.id})
        .then(exmpl => res.status(201).redirect(301, '/example'))
    .catch(next)

})

module.exports = router