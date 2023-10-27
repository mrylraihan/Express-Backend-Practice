const express = require('express');
const router = express.Router();

const Chore = require('../models/chore');

router.get('/', async (req, res) => {
    try {
        const allChores = await Chore.find()
        res.status(200).json(allChores)
    } catch (err) {
        res.json(err)
    }
})


router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const chore = await Chore.findById(id)
        res.json(chore)
    } catch (err) {
        res.status(404).json({ message: 'Item not found' })
    }
})


router.post('/', async (req, res) => {
    if (req.body.title) {
        try {
            const newChore = await Chore.create(req.body)//needs ato be in a destination object   
            res.json(newChore);
        } catch (err) {
            res.status(500).json({ message: 'sorry no title for your chore!' })

        }
    } else {
        res.status(400).json({ message: 'Improper title' })
    }

})

router.put('/:id', async (req, res) => {
    if (req.params.id && req.body.title) {
        try {
            const newChore = await Chore.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
            res.json(newChore);
        } catch (err) {
            res.json(err)
        }
    } else {
        res.status(404).json({ message: 'sorry you either didnt pass in a id or proper body' })
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const deletedChore = await Chore.findByIdAndDelete({ _id: req.params.id })
        console.log(deletedChore)
        if (deletedChore == null) {
            res.status(404).json({ message: 'Task doesnt exist' })
        } else {
            res.redirect(301, '/chores')//this will redirect u to the full get route
            // res.json({message:"successfully deleted"})//this will redirect u to the full get route
        }

    } catch (err) {
        res.json(err)
    }

})

module.exports = router