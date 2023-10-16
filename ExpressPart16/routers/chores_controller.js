const express = require('express');
const router = express.Router();

const Chore = require('../models/chore');

router.get('/', (req, res) => {
    Chore.find()
        .then(chores => {
            res.status(200).json(chores)
        })
        .catch(err => res.json(err))
})


router.get('/:id', (req, res) => {
    const id = req.params.id
    Chore.findById(id)
        .then(chore => {
            res.json(chore)
        })
        .catch(err => res.status(404).json({message:'Item not found'}))
})


router.post('/', (req, res) => {
    if(req.body.title){
        Chore.create(req.body)//needs ato be in a destination object
        .then(newChore => {
            res.json(newChore);
        })
        .catch(err => res.json(err))
    }else{
        res.status(400).json({message:'sorry no title for your chore!'})
    }

})

router.put('/:id', (req, res) => {
    Chore.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then(newChore => {
            res.json(newChore);
        })
        .catch(err => res.json(err))
})


router.delete('/:id', (req, res) => {
    Chore.findByIdAndDelete({ _id: req.params.id })
        .then(deletedChore => {
            // res.json(deletedDestination);//this will show the deleted item
            console.log(deletedChore)
            if(deletedChore == null){
                res.status(404).json({message:'Task doesnt exist'})
            }else{
                res.redirect(301, '/chores')//this will redirect u to the full get route
            }
        })
        .catch(err => res.json(err))
})

module.exports = router