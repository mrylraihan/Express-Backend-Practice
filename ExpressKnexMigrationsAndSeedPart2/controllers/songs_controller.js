const express = require('express')
const router = express.Router()

// connecting to knex /db
const config = require('../knexfile').development;
let knex = require('knex')(config)

router.get('/', (req,res)=>{
    knex('songs')
    .then(songs=>{
        res.json(songs)
    })
    .catch(err => res.json(err))
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    knex('songs').where({ id: id }).first()
        .then(song => {
            if (song) {
                res.json(song)
            } else {
                next({ status: 404, customMessage: 'No song Found!' })
            }
        })
        .catch(err => res.json(err))
})

router.post('/', (req, res, next) => {
    const song = req.body
    if (!song.name) {
        next({ status: 404, customMessage: "No name found!" })
    } else {
        knex('songs')
            .insert(song)
            .returning('*')
            .then(newSongs => {
                // res.json(newSongs)//returns array 
                res.json(newSongs[0])//returns array 
            })
            .catch(err => res.json(err))
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    knex('songs')
        .where({ id: id })
        .update(body)
        .returning('*')
        .then(song => {
            if (song.length > 0) {
                res.json(song)
            } else {
                next({ status: 404, customMessage: 'No Body Found!' })
            }
        })
        .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
    // res.send("Delete Chores")
    const id = req.params.id
    knex('songs')
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