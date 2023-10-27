const express = require('express')
const router = express.Router()

const config = require('../knexfile').development;
let knex = require('knex')(config)

router.get('/', (req, res) => {
    // res.send("All Chores")
    knex('users')
        .then(chores => {
            res.json(chores)
        })
        .catch(err => res.json(err))
})

router.post('/login', (req, res) => {
    const loginUser = req.body
    if (!loginUser.username) {
        res.json({ status: 404, customMessage: 'No user Found!' })
    } else {
        knex('users')
            .where({ username: loginUser.username })
            .first()
            .then(user => {
                if (user.password == loginUser.password) {
                    res.json(user)
                } else {
                    res.json({ status: 404, customMessage: 'No User Found!' })
                }
            })
            .catch(err => res.json(err))
    }

})
router.post('/sign-in', (req, res) => {
    // res.send("Create Chores")
    const user = req.body
    if (!user.username) {
        res.json({ status: 404, customMessage: 'No username Found!' })
    } else {
        knex('users')
            .insert(user)
            .returning('*')
            .then(user => {
                res.json(user)

            })
            .catch(err => res.json(err))
    }
})

module.exports = router