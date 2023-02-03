const express = require('express')
const router = express.Router()

const Note = require('../models/note')

router.get('/', (req, res) => {
    Note.find().select('-__v')
        .then(noteList => res.json(noteList))
        .catch(err => res.json(err))
})


module.exports = router