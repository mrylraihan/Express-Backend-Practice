const express = require("express");
const router = express.Router();
const { authenticate } = require('../config/jwt.config')
const jwt = require("jsonwebtoken");


const Todo = require("../models/todo")

router.get('/:ownerId', authenticate, (req, res) => {
    Todo.find({ owner: req.params.ownerId })
    .populate('owner')
        .then(users => res.status(200).json(users))
    console.log(authenticate)
})
// get all todos with out auth and populate owner
// next route

router.post('/', authenticate, (req, res) => {
    // req.body.owner = req.cookies.userToken.id
    Todo.create(req.body)
        .then(todo => res.status(200).json(todo))
    console.log(authenticate)
})

module.exports = router