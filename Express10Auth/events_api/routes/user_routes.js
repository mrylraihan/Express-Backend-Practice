const express = require('express')
// require bcrypt lib
const bcrypt = require('bcrypt')
// generate random tokens for our signed in users(sign-in)
const crypto = require('crypto')
// require passport for authentication
const passport = require('passport')
// require user model so we can interact with mongo in our routes
const User = require('../models/user')
//we can pass the in directly to our route after the url and before the req,res but because we are using it alot in multiple routes we will store it in a requiresToken variable so we just pass that in
//this function when added to a route will make sure that the user is signed in before accessing that route
const requiresToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// just to see all users
router.get('/all-user', (req, res, next) => {
    User.find()
        .then(users => res.json(users))
        .catch(next)
})

// sign-up a user
router.post('/sign-up', (req, res, next) => {
    const credentials = req.body.credentials
    // Allow us to start a promise chain 
    Promise.resolve()
        // we dont need any data for this promise chain we are doing it for error handling
        .then(() => {
            if (!credentials ||
                !credentials.password ||
                credentials.password !== credentials.password_confirmation) {
                throw new Error('A required parameter was omitted or invalid')
            }
        }).then(() => //we connected this promise to this one with the arrow function
            //first param is password, second param is how many rounds of salt
            bcrypt.hash(credentials.password, 10))
        .then(hashedPassword => {
            console.log(hashedPassword);//log this first to see your hashPassword
            // store the email in the new user obj and new hashedPassword instead of password
            const userData = {
                email: credentials.email,
                hashedPassword: hashedPassword
            }
            return User.create(userData)
        })//because hash has an error first callback(error first mean promise), that means we can use a promise
        .then(user => res.status(201).json({ user }))
        .catch(next)

})

// Sign-in 
router.post('/sign-in', (req, res, next) => {
    // get password from request
    const password = req.body.credentials.password
    const email = req.body.credentials.email
    // declare user to access in the promise chain and to keep track of returned document
    let user
    // find the user by email
    User.findOne({ email })//email:req.body.credentials.email
        .then(userData => {
            if (!userData) {
                throw new Error('Document not found')
            }
            user = userData
            return bcrypt.compare(password, user.hashedPassword)
        })
        .then(correctPassword => {
            // console.log(correctPassword);//to test 
            // res.json(user)
            if (!correctPassword) {
                throw new Error('Email or password is invalid')
            }
            // create a token
            // https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
            // crypto is now a built into he node modules so you dont have to npm i anymore
            const token = crypto.randomBytes(16).toString('hex')

            // add token to user
            user.token = token

            // save user
            return user.save()
        })
        // respond with user and the token
        .then(user => {
            res.status(201).json({ user })
        })
        .catch(next)
})
// Passport is how you can see if your signed in 
//first thing npm i passport and passport-http-bearer
// you can only change a password if your signed in
router.patch('/change-password',requiresToken, (req, res, next)=>{
    // console.log('changed password');
    // res.json({user:req.user})//req.user will give us back the user because we are using to token to find our user

    // declare user to access in the promise chain
    let user
    // find user by their id
    User.findById(req.user.id)
        // if we find a record save to our user variable
        .then(record => {
            user = record
            // compare old password and stored password
            return bcrypt.compare(req.body.passwords.old, user.hashedPassword)
        })
        .then(correctPassword => {
            // if the password is incorrect or there is no new password
            if (!correctPassword || !req.body.passwords.new) {
                throw new Error('A required parameter was omitted or invalid')
            }
            // if password is correct then encrypt new password
            return bcrypt.hash(req.body.passwords.new, 10)
        })
        .then(hash => {
            // add new has as hashed password for user
            user.hashedPassword = hash
            // save user
            return user.save()
        })
        // respond with 204
        .then(() => res.sendStatus(204))
        .catch(next)
})

router.delete('/sign-out', requiresToken, (req, res, next) => {
    //create new token
    req.user.token = crypto.randomBytes(16)
    req.user.save()
        // do not send new token back to client
        .then(() => res.sendStatus(204))
        .catch(next)
})
module.exports = router