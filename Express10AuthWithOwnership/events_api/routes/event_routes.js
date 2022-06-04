// require the express library
const express = require('express')

// require passport for authentication
const passport = require('passport')

// require event model so we can interact with mongo in our routes
const Event = require('../models/event')

// require our custom errors and extract them 
const customErrors = require('../lib/custom_errors')

const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

//we can pass the in directly to our route after the url and before the req,res but because we are using it alot in multiple routes we will store it in a requiresToken variable so we just pass that in
//this function when added to a route will make sure that the user is signed in before accessing that route
const requiresToken = passport.authenticate('bearer', { session: false })

// create a router for our express 
const router = express.Router()

router.get('/events', (req, res, next) => {
    Event.find()
    .populate('owner')
        .then(events => res.json(events))
        .catch(err => res.json(err))
})
// my practice one
// router.post('/events',requiresToken, (req, res, next)=>{
//     const id = req.user._id
//     const event = req.body
//     event.owner = id
//     Event.create(event)
//     .then(result=>res.json(result))
//     .catch(err=>res.json(err))
// })

router.post('/events',requiresToken, (req, res, next)=>{
  
    const eventData = req.body.event
    eventData.owner = req.user._id
    Event.create(eventData)
    .then(event=>res.status(201).json(event))
    .catch(next)
})

router.delete('/events/:id', requiresToken, (req, res, next)=>{
    const id = req.params.id
    Event.findById(id)
    .then(handle404)
    // before deleting an event make sure the current user owns it 
    // other wise cause an ownership error 
    .then(event => requireOwnership(req, event))
    .then(event=> event.deleteOne())
    .then(()=>res.sendStatus(204))
    .catch(next)
})

// Update: PATCH /events/:id
router.put('/events/:id', requiresToken, (req, res, next) => {
    // get id of event from params
    const id = req.params.id;
    // get event data from request
    const eventData = req.body.event;
    // fetching event by its id
    Event.findById(id)
        // handle 404 error if no event found
        .then(handle404)
        // ensure the signed in user (req.user.id) is the same as the event's owner (event.owner)
        .then((event) => requireOwnership(req, event))
        // updating event object with eventData
        .then((event) => event.updateOne(eventData))
        // if successful return 204
        .then(() => res.sendStatus(204))
        // on error go to next middleware
        .catch(next);
});


module.exports = router