const express = require('express')
const router = express.Router()

const config = require('../knexfile').development;
let knex = require('knex')(config)


router.get('/', (req, res) => {
    knex('todos')
        .then(todos => {
            res.json(todos)
        })
        .catch(err => res.json(err))
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    knex('todos').where({ id: id }).first()
        .then(todo => {
            if (todo) {
                res.json(todo)
            } else {
                next({ status: 404, customMessage: 'No todo Found!' })
            }
        })
        .catch(err => res.json(err))
})

router.post('/', (req, res, next) => {
    const todo = req.body
    if (!todo.title) {
        next({ status: 404, customMessage: "No title found!" })
    } else {
        knex('todos')
            .insert(todo)
            .returning('*')
            .then(newTodos => {
                // res.json(newTodos)//returns array 
                res.json(newTodos[0])//returns array 
            })
            .catch(err => res.json(err))
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    knex('todos')
        .where({ id: id })
        .update(body)
        .returning('*')
        .then(todo => {
            if (todo.length > 0) {
                res.json(todo)
            } else {
                next({ status: 404, customMessage: 'No Body Found!' })
            }
        })
        .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
    // res.send("Delete Chores")
    const id = req.params.id
    knex('todos')
        .where({ id: id })
        .del()
        .then(numSongDeleted => {

            res.json({ message: ` ${numSongDeleted} song was Deleted!` })

            //     next({ status: 404, customMessage: 'No Body Found!' })
            // }
        })
        .catch(err => res.json(err))
})


module.exports = router