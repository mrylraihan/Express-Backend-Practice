const express = require("express");
const router = express.Router();
const {authenticate} = require('../config/jwt.config')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')

const User = require("../models/user.model");

router.get('/', authenticate, (req, res)=>{
    User.find()
    .then(users=>res.status(200).json(users))
})
router.get('/getAll', (req, res)=>{
    User.find()
    .then(users=>res.status(200).json(users))
})
router.get('/:id', (req, res)=>{
    User.findById(req.params.id)
    .then(user=>res.status(200).json(user))
})

router.post('/register', (req, res)=>{
    const userInput = req.body
    User.create(userInput)
    .then(user=>{
       let userToken = jwt.sign(
            {
                id: user._id,
            },
            process.env.SECRET_KEY
        );
        return res.cookie("usertoken", userToken, {
                httpOnly: true,
            })
            .json({ message: "success", user: user });
    })
    .catch(error=>{
        console.log(error);
        res.status(500).json({ error: error });
    })
})

router.post('/login', (req, res)=>{
    const userInput = req.body
    User.findOne({username:userInput.username})
    .then(user=>{
    if(user === null){
        return res.status(404).json({ message: "user not found" });
    }
    const correctPw = bcrypt.compare(req.body.password, user.password);

    if (!correctPw) {
        return res.sendStatus(400);
    }

    const userToken = jwt.sign({id: user._id,},process.env.SECRET_KEY);
    res
        .cookie("usertoken", userToken, { httpOnly: true })
        .json({ msg: "success", user, userToken });
    })
    .catch(err=>res.json(err))
})


module.exports = router