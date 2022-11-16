const express = require('express')
const router = express.Router()

const Hero = require('../classes/Hero')
const heroArray = require('../data/data').heroArray
//get all route
router.get('/', (req, res) => {
    res.json(heroArray)
})
//post route creating something
router.post('/', (req, res) => {
   let newHero = new Hero(req.body.name, req.body.heroName, req.body.power, req.body.level)

   heroArray.push(newHero)
   res.json(newHero)
})
router.get('/details/:id', (req, res) => {
   const idx = req.params.id

   res.json({message:heroArray[idx].details()})
})

module.exports = router