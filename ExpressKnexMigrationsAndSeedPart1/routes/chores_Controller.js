const express = require('express')
const router = express.Router()

// connecting to knex /db
const config = require('../knexfile').development;
let knex = require('knex')(config)

router.get('/', (req, res)=>{
    // res.send("All Chores")
    knex('chores')
    .then(chores=>{
        res.json(chores)
    })
    .catch(err=>res.json(err))
})

router.get('/:id', (req, res, next)=>{
    const id = req.params.id
    // res.send("Get Chore By Id")
    knex('chores')
    .where({id:id})
    .first()
        .then(chore => {
            if(chore){
                res.json(chore)
            }else{
                next({status:404, customMessage:'No Chore Found!'})
            }
        })
        .catch(err => res.json(err))
})
router.post('/', (req, res, next)=>{
    // res.send("Create Chores")
    const chore = req.body
    if(!chore.title){
        next({status:404, customMessage:'No Title Found!'})
    }else{
        knex('chores')
            .insert(chore)
            .returning('*')
            .then(chore => {
                    res.json(chore)
    
            })
            .catch(err => res.json(err))
    }
})

router.put('/:id', (req, res)=>{
    // res.send("Edit Chores")
    const id = req.params.id
    const newChore = req.body
    knex('chores')
        .where({ id: id })
        .update(newChore)
        .returning('*')
        .then(chore => {
            if (chore.length>0) {
                res.json(chore)
            } else {
                next({ status: 404, customMessage: 'No Body Found!' })
            }
        })
        .catch(err => res.json(err))
})
router.delete('/:id', (req, res)=>{
    // res.send("Delete Chores")
    const id = req.params.id
    knex('chores')
        .where({ id: id })
        .del()
        .then(numChoreDeleted => {
           
                res.json({message:` ${numChoreDeleted} Chores was Deleted!`})
          
            //     next({ status: 404, customMessage: 'No Body Found!' })
            // }
        })
        .catch(err => res.json(err))
})

module.exports = router