const express = require('express')
const router = express.Router()
const gundams = require('../../data/gundam')


// Getting all 
router.get('/', (req, res) => {
    res.json(gundams)
})

// these must go before :id because then it just register as an id when you pass in 
// gundam or pilot into the url after gundams/
// Mapping all Gundams
router.get('/gundam', (req, res) => {
    const justGundams = gundams.map(mech => mech.gundam)
    res.json(justGundams)
})
// Mapping all pilots
router.get('/pilots', (req, res) => {
    const justPilots = gundams.map(mech => mech.pilot)
    res.json(justPilots)
})

//GET BY ID
router.get('/:id', (req, res, next) => {
    const gundam = gundams.filter(mech => mech.id == req.params.id)
    if (gundam.length < 1) {
        // res.json({ error: `No Gundam Found!` })
        next({ status:404, customMessage: `No Gundam Found!` })
    } else {
        // res.json(gundam)will return the array 
        res.json(gundam[0])
    }
})
// Creating a gundam
router.post(`/`, (req, res, next) => {
    if (req.body.pilot && req.body.gundam) {

        const newGundam = {
            id: gundams.length+1, pilot: req.body.pilot, gundam: req.body.
                gundam
        }
        gundams.push(newGundam)
        res.redirect(303, `/gundams/${newGundam.id}`)
    } else {
        // res.json({ error: `make sure to add a gundam name , pilot name, and id!` })
        next({ status:404, customMessage: `make sure to add a gundam name , pilot name, and id!` })
    }
})

//PUT
router.put(`/:id`, (req, res, next) => {
    const ERROR_EDIT = "there is an issues with what your trying to edit!"
    if (req.body.gundam && req.body.pilot) {
        const matchingMech = gundams.findIndex(mech => mech.id == req.params.id);
        if (matchingMech > -1) {
            let mech = gundams[matchingMech]
            mech.pilot = req.body.pilot
            mech.gundam = req.body.gundam
            res.redirect(303, `/gundams/${mech.id}`)
        } else {
            // res.json({ error: ERROR_EDIT })
            next({status:404, customMessage: ERROR_EDIT })
        }
    } else {
        // res.json({ error: ERROR_EDIT })
        next({ status: 404, customMessage: ERROR_EDIT })
    }

})
//PUT
router.patch(`/:id`, (req, res, next) => {
    const ERROR_EDIT = "there is an issues with what your trying to edit!"
    if (req.body.gundam) {
        const matchingMech = gundams.findIndex(mech => mech.id == req.params.id);
        if (matchingMech > -1) {
            let mech = gundams[matchingMech]
            mech.gundam = req.body.gundam
            res.redirect(303, `/gundams/${mech.id}`)
        } else {
            // res.json({ error: ERROR_EDIT })
            next({status:404, customMessage: ERROR_EDIT })
        }
    } else if (req.body.pilot){
        const matchingMech = gundams.findIndex(mech => mech.id == req.params.id);
        if (matchingMech > -1) {
            let mech = gundams[matchingMech]
            mech.pilot = req.body.pilot
            res.redirect(303, `/gundams/${mech.id}`)
        } else {
            // res.json({ error: ERROR_EDIT })
            next({ status: 404, customMessage: ERROR_EDIT })
        }
    } 
    else {
        // res.json({ error: ERROR_EDIT })
        next({ status: 404, customMessage: ERROR_EDIT })
    }

})
//Delete

router.delete(`/:id`, (req, res, next) => {
    const ERROR_EDIT = "there is an issues with what your trying to delete!"
    if (req.params.id) {
        const matchingMech = gundams.findIndex(mech => mech.id == req.params.id);
        if (matchingMech > -1) {
            gundams.splice(matchingMech, 1);
            res.redirect(303, `/gundams`)
        } else {
            next({ status: 404, error: ERROR_EDIT })
        }
    } else {
        next({ status: 404, error: ERROR_EDIT })
    }

})


module.exports  = router