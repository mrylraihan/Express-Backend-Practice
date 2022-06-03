const express = require('express');
const router = express.Router();

const Destination = require('../models/destination');

// geting all data , with vistied :true
router.get('/', (req, res) => {
    // Destination.find({visited:true})
    Destination.find()
        .then(dest => {
            res.json(dest);
        })
        .catch(err => res.json(err))
})
router.get('/visited', (req, res) => {
    Destination.find({ visited: true })
        // Destination.find()
        .then(dest => {
            res.json(dest);
        })
        .catch(err => res.json(err))
})

router.get('/:id', (req, res) => {
    Destination.findOne({ _id: req.params.id })
        .then(destination => res.json(destination))
        .catch(err => res.json(err))
});

router.post('/', (req, res) => {
    Destination.create(req.body.destination)//needs ato be in a destination object
        .then(newDestination => {
            res.json(newDestination);
        })
        .catch(err => res.json(err))
})

router.put('/:id', (req, res) => {
    Destination.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(newDestination => {
            res.json(newDestination);
        })
        .catch(err => res.json(err))
})

router.patch('/:id', (req, res) => {
    Destination.findByIdAndUpdate({ _id: req.params.id }, {visited : req.body.visited}, { new: true })
        .then(newDestination => {
            res.json(newDestination);
        })
        .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
    Destination.findByIdAndDelete({ _id: req.params.id })
        .then(deletedDestination => {
            // res.json(deletedDestination);//this will show the deleted item
            res.redirect(301, '/destinations')//this will redirect u to the full get route
        })
        .catch(err => res.json(err))
})

module.exports = router