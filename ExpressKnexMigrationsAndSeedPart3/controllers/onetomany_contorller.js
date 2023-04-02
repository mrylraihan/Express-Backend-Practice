const express = require('express')
const router = express.Router()

const config = require('../knexfile').development;
let knex = require('knex')(config)

// getting all todos and adding a property of the users name
router.get('/todo', (req, res) => {
    knex('todos')
        .then(todos => {
            // res.json(todos)
            knex('users')
                .then(users => {
                   let todoWithUser = todos.map(ele=>{
                        return {...ele, user:users[ele.user_id].name}
                    })

                    res.json(todoWithUser)

                })
        })
        .catch(err => res.json(err))
})

// getting all users and adding a property of all there todos
router.get('/user', (req, res) => {
    knex('todos')
        .then(todos => {
            // res.json(todos)
            knex('users')
                .then(users => {
                   let usersWithTodos = users.map(ele=>{
                        return {...ele, todos: todos.filter(todo=>todo.user_id===ele.id)}
                    })

                    res.json(usersWithTodos)

                })
        })
        .catch(err => res.json(err))
})

// finding by id and adding the user name

router.get('/todo/:id', (req, res, next) => {
    const id = req.params.id
    knex('todos').where({ id: id }).first()
        .then(todo => {
            if (todo) {
                knex('users').where({id:todo.user_id}).first()
                .then(user=>{
                    todo.user = user.name
                    res.json(todo)
                })
            } else {
                next({ status: 404, customMessage: 'No todo Found!' })
            }
        })
        .catch(err => res.json(err))
})




module.exports = router