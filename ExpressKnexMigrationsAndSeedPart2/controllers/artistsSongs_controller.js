const express = require('express')
const router = express.Router()

// connecting to knex /db
const config = require('../knexfile').development;
let knex = require('knex')(config)


// these routes will show us a 1-Many relationship

router.get('/test', (req,res)=>{
    res.json({message:'we in the artistSongs Controller'})
})

// you have to do 2 knex calls this one will not require first because we want back an array for the songs

router.get('/artist/:id', (req,res)=>{
    const id = req.params.id
    knex('artists').where({ id: id }).first()
        .then(artist => {
            knex('songs')
                .where({artist_id : artist.id })
                .then(songs=>{
                    artist.songs = songs
                    res.json(artist)
                })
                .catch(err => res.json(err))

        })
        .catch(err => res.json(err))
})


// you have to do 2 knex calls this one will require first because we only want back an single object for the artist

router.get('/songs/:id', (req,res)=>{
    const id = req.params.id
    knex('songs').where({ id: id }).first()
        .then(song => {
            knex('artists')
                .where({id : song.artist_id })
                .first()
                .then(artist=>{
                    song.artist = artist
                    res.json(song)
                })
                .catch(err => res.json(err))

        })
        .catch(err => res.json(err))
})

// here we are only creating a song but with the artist name doing 2 knex calls 1 to find the artist, then removing the artistName from the req.body and creating the song with the rest oif the req.body. then after that re-appending the data we got back from the artist table to the song with dot-notation 
// song = song[0];
// song.artist = foundArtist;
// res.json(song)
router.post('/songs', (req, res, next) => {
    knex('artists')
    .where({name: req.body.artistName})
    .first()
    .then(foundArtist=>{
        req.body.artist_id = foundArtist.id;
        delete req.body.artistName;
        knex('songs')

        .insert(req.body)
        .returning('*')
        .then(song=>{
            song = song[0];
            song.artist = foundArtist;
            res.json(song)
        })
            .catch(err => res.json(err))
    })
        .catch(err => res.json(err))

})

module.exports = router