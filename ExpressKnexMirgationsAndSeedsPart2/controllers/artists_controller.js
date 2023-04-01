const express = require('express')
const router = express.Router()

// connecting to knex /db
const config = require('../knexfile').development;
let knex = require('knex')(config)

router.get('/', (req, res) => {
    // res.send("All Artists")
    knex('artists')
        .then(artists => {
            res.json(artists)
        })
        .catch(err => res.json(err))
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id
    knex('artists').where({ id: id }).first()
        .then(artist => {
            if (artist) {
                res.json(artist)
            } else {
                next({ status: 404, customMessage: 'No Artist Found!' })
            }
        })
        .catch(err => res.json(err))
})

router.post('/', (req, res, next) => {
    const artist = req.body
    if (!artist.name) {
        next({ status: 404, customMessage: "No name found!" })
    } else {
        knex('artists')
            .insert(artist)
            .returning('*')
            .then(newArtists => {
                // res.json(newArtists)//returns array 
                res.json(newArtists[0])//returns array 
            })
            .catch(err => res.json(err))
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    knex('artists')
        .where({ id: id })
        .update(body)
        .returning('*')
        .then(artist => {
            if (artist.length > 0) {
                res.json(artist)
            } else {
                next({ status: 404, customMessage: 'No Body Found!' })
            }
        })
        .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
    // res.send("Delete Chores")
    const id = req.params.id
    knex('artists')
        .where({ id: id })
        .del()
        .then(numArtistDeleted => {

            res.json({ message: ` ${numArtistDeleted} artist was Deleted!` })

            //     next({ status: 404, customMessage: 'No Body Found!' })
            // }
        })
        .catch(err => res.json(err))
})

module.exports = router