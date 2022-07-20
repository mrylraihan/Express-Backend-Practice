const express = require('express')
const router = express.Router()

const Designer = require('../models/designer')

// get all
router.get('/', (req, res)=>{
    Designer.find()
    .then(designerList=>res.json(designerList))
    .catch(err=>res.json(err))
})
// get one by id
router.get('/:id', (req, res)=>{
    const id = req.params.id
    Designer.findById(id)
    .then(designer=>res.json(designer))
    .catch(err=>res.json(err))
})
// creating a designer
router.post('/', (req, res)=>{
    const designer = req.body.designer
    Designer.create(designer)
    .then(designer=>res.json(designer))
    .catch(err=>res.json(err))
})
// delete a designer
router.delete('/:id', (req, res)=>{
    const id = req.params.id
    Designer.findByIdAndDelete(id)
    .then(designer=>res.json(designer))
    // .then(designer=>res.redirect(301,'/designer'))
    .catch(err=>res.json(err))
})



module.exports = router