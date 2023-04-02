const express = require('express')
const router = express.Router()

const config = require('../knexfile').development;
let knex = require('knex')(config)


router.get('/', (req, res) => {
    knex('users')
        .then(users => {
            res.json(users)
        })
        .catch(err => res.json(err))
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    knex('users').where({ id: id }).first()
        .then(user => {
            if (user) {
                res.json(user)
            } else {
                next({ status: 404, customMessage: 'No User Found!' })
            }
        })
        .catch(err => res.json(err))
})

router.post('/', (req, res, next) => {
    const user = req.body
    if (!user.name) {
        next({ status: 404, customMessage: "No name found!" })
    } else {
        knex('users')
            .insert(user)
            .returning('*')
            .then(newUsers => {
                // res.json(newusers)//returns array 
                res.json(newUsers[0])//returns array 
            })
            .catch(err => res.json(err))
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    knex('users')
        .where({ id: id })
        .update(body)
        .returning('*')
        .then(user => {
            if (user.length > 0) {
                res.json(user)
            } else {
                next({ status: 404, customMessage: 'No Body Found!' })
            }
        })
        .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
    // res.send("Delete Chores")
    const id = req.params.id
    knex('users')
        .where({ id: id })
        .del()
        .then(numUserDeleted => {

            res.json({ message: ` ${numUserDeleted} artist was Deleted!` })

            //     next({ status: 404, customMessage: 'No Body Found!' })
            // }
        })
        .catch(err => res.json(err))
})

module.exports = router