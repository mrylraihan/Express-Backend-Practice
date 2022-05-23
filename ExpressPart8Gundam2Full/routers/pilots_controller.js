const express = require("express")
const router = express.Router()

const Pilot = require("../models/pilot")
//Get
router.get('/', (req, res)=>{
    Pilot.find()
        .populate('gundams_piloted')
        .then(user=>res.json(user))
        .catch(err=>res.json(err))
})
//Get by Id
router.get('/:id', (req, res)=>{
    Pilot.findOne({_id:req.params.id})
        // .populate('gundams_piloted')
        .then(user=>res.json(user))
        .catch(err=>res.json(err))
})
// Post
router.post('/', (req, res)=>{
    Pilot.create(req.body)
        // .populate('gundams_piloted')
        .then(user=>res.json(user))
        .catch(err=>res.json(err))
})
// Put
router.put('/:id', (req, res)=>{
    Pilot.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true})
        // .populate('gundams_piloted')
        .then(user=>res.json(user))
        .catch(err=>res.json(err))
})

router.put('/:pilot_id/gundams', (req, res)=>{
    Pilot.findByIdAndUpdate(
        req.params.pilot_id,
        {$push :{gundams_piloted: req.body.gundam}},
        {new:true}
    )
    .then(updatedUser=>res.json(updatedUser))
    .catch(err=>res.json(err))
})

router.delete('/:pilot_id/gundams/:gundam_id', (req, res)=>{
    Pilot.findByIdAndUpdate(
        req.params.pilot_id,
        {$pull:{gundams_piloted:req.params.gundam_id}},
        {new:true}
    )
    .then(userUpdate=>res.json(userUpdate))
    .catch(err=>res.json(err))
})

router.delete('/:id', (req, res)=>{
    Pilot.findOneAndDelete({_id: req.params.id})
    // .then(user=>res.json(user))
    .then(user=>res.redirect(301, '/pilots'))
    .catch(err=>res.json(err))
})

module.exports = router;