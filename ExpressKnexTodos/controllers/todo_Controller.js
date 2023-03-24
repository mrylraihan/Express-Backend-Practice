const express = require('express')
const router = express.Router()

// connecting to knex /db
const config = require('../knexfile').development;
let knex = require('knex')(config)

router.get('/', (req, res) => {
    // res.send("All Chores")
    knex('todo')
        .then(todo => {
            res.json(todo)
        })
        .catch(err => res.json(err))
})
router.get('/:id', (req, res, next) => {
    // res.send("All Chores")
    const id = req.params.id
    knex('todo').where({id:id}).first()
        .then(todo => {
            if (todo) {
                res.json(todo)
            } else {
                next({ status: 404, customMessage: 'No todo Found!' })
            }
        })
        .catch(err => res.json(err))
})

router.post('/', (req, res, next)=>{
    const todo = req.body
    if(!todo.title){
        next({status:404, customMessage:"No title found!"})
    }else{
        knex('todo')
        .insert(todo)
        .returning('*')
        .then(newTodo=>{
            res.json(newTodo)
        })
        .catch(err=>res.json(err))
    }
})


router.put('/:id', (req,res)=>{
    const id = req.params.id
    const body = req.body
    knex('todo')
    .where({id:id})
    .update(body)
    .returning('*')
    .then(todo=>{
        if (todo.length > 0) {
            res.json(todo)
        } else {
            next({ status: 404, customMessage: 'No Body Found!' })
        }
    })
    .catch(err=>res.json(err))
})

router.delete('/:id', (req, res) => {
    // res.send("Delete Chores")
    const id = req.params.id
    knex('todo')
        .where({ id: id })
        .del()
        .then(numChoreDeleted => {

            res.json({ message: ` ${numChoreDeleted} todo was Deleted!` })

            //     next({ status: 404, customMessage: 'No Body Found!' })
            // }
        })
        .catch(err => res.json(err))
})


module.exports = router 