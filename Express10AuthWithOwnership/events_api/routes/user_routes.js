// require the express library
const express = require('express')

// require bcrypt lib
const bcrypt = require('bcrypt')

// generate random tokens for our signed in users(sign-in)
const crypto = require('crypto')

// require passport for authentication
const passport = require('passport')

// require user model so we can interact with mongo in our routes
const User = require('../models/user')

// require our custom errors and extract them 
const customErrors = require('../lib/custom_errors')
const handle404 = customErrors.handle404
const BadParamsError = customErrors.BadParamsError
const BadCredentialsError = customErrors.BadCredentialsError

//we can pass the in directly to our route after the url and before the req,res but because we are using it alot in multiple routes we will store it in a requiresToken variable so we just pass that in
//this function when added to a route will make sure that the user is signed in before accessing that route
const requiresToken = passport.authenticate('bearer', { session: false })

// create a router for our express 
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
                // throw new Error('A required parameter was omitted or invalid')
                // add our custom error
                throw new BadParamsError()
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
        .then(handle404)//if find one returns null because user doesnt exist with that email 
        // cause a 404 error DocumentNotFound 
        .then(userData => {
            // if (!userData) {
            //     // throw new Error('Document not found')
            //     // add custom before it in a .then()
            // }
            user = userData
            return bcrypt.compare(password, user.hashedPassword)
        })
        .then(correctPassword => {
            // console.log(correctPassword);//to test 
            // res.json(user)
            if (!correctPassword) {
                // throw new Error('Email or password is invalid')
                // add custom error handling 
                throw new BadCredentialsError()
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
            console.log(req.user, 'im a user');
            // compare old password and stored password
            return bcrypt.compare(req.body.passwords.old, user.hashedPassword)
        })
        .then(correctPassword => {
            // if the password is incorrect or there is no new password
            if (!correctPassword || !req.body.passwords.new) {
                // throw new Error('A required parameter was omitted or invalid')
                // adding our custom error
                throw new BadParamsError()
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

// we use `requireToken` to make sure the user is signed in first
router.delete('/sign-out', requiresToken, (req, res, next) => {
    //create new token
    // req.user.token = crypto.randomBytes(16)
    req.user.token = null
    req.user.save()
        // do not send new token back to client
        .then(() => res.sendStatus(204))
        .catch(next)
})
// how its stored with a random token that gets regenerated with a new token when you sign in 
// [
//     {
//         "_id": "62980e0551d0c2da61dba037",
//         "email": "Ronnie@gmail.com",
//         "createdAt": "2022-06-02T01:10:29.744Z",
//         "updatedAt": "2022-06-04T14:39:08.389Z",
//         "__v": 0,
//         "token": "k��k�GrX � �g֟"
//     },
// when you change the token to null when you sign out
//     {
//         "_id": "629b70cce5cbac99b79b3d20",
//         "email": "wallie@gmail.com",
//         "createdAt": "2022-06-04T14:48:44.859Z",
//         "updatedAt": "2022-06-04T14:49:24.007Z",
//         "__v": 0,
//         "token": null
//     }
// ]
module.exports = router