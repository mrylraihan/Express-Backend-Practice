const express = require('express')

const Example = require('../models/example')

const router = express.Router()


// Get all
router.get('/', (req, res, next)=>{
    res.json({message:'it worked !'})
    // Example.find()
    // .then(examples=> res.status(200).json(examples))
    // .catch(next)
})

// POST /examples
router.post('/', (req, res, next) => {
    // set owner of new example to be current user
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


module.exports = router