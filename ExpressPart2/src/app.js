const gundams = require('../data/gundam');

const {nanoid} = require('nanoid');

const express = require('express');
const cors = require('cors')

const app = express();
const port = 4000
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Home page
app.get('/', (req, res)=>{
    res.send(`check out our gundams!`) // this an array 
})

// Getting all 
app.get('/gundams', (req, res)=>{
    res.json(gundams)
})

// these must go before :id because then it just register as an id when you pass in 
// gundam or pilot into the url after gundams/
// Mapping all Gundams
app.get('/gundams/gundam', (req,res)=>{
    const justGundams = gundams.map(mech=>mech.gundam)
    res.json(justGundams)
})
// Mapping all pilots
app.get('/gundams/pilots', (req,res)=>{
    const justPilots = gundams.map(mech=>mech.pilot)
    res.json(justPilots)
})

//GET BY ID
app.get('/gundams/:id', (req, res)=>{
    const gundam = gundams.filter(mech=>mech.id == req.params.id)
    if(gundam.length<1){
        res.json({error:`No Gundam Found!`})
    }else{
        res.json(gundam)
    }
})
// Creating a gundam
app.post(`/gundams`, (req, res)=>{
    if (req.body.id && req.body.pilot && req.body.gundam){

        const newGundam = { id: req.body.id, pilot: req.body.pilot, gundam: req.body.
            gundam}
            gundams.push(newGundam)
            res.redirect(`gundams/${newGundam.id}`)
        }else{
            res.json({error:`make sure to add a gundam name , pilot name, and id!`})
        }
})

//PUT
app.put(`/gundams/:id`, (req,res)=>{
    const ERROR_EDIT = "there is an issues with what your trying to edit!"
    if(req.body.gundam && req.body.pilot){
       const matchingMech = gundams.findIndex(mech=>mech.id == req.params.id);
        if(matchingMech > -1){
            let mech = gundams[matchingMech]
            mech.pilot = req.body.pilot
            mech.gundam = req.body.gundam
            res.redirect(`/gundams/${mech.id}`)
        }else{
            res.json({error:ERROR_EDIT})
        }
    }else{
        res.json({error:ERROR_EDIT})
    }

})
//PUT
app.delete(`/gundams/:id`, (req,res)=>{
    const ERROR_EDIT = "there is an issues with what your trying to delete!"
    if(req.params.id){
       const matchingMech = gundams.findIndex(mech=>mech.id == req.params.id);
        if(matchingMech > -1){
            gundams.splice(matchingMech, 1);
            res.redirect(`/gundams`)
        }else{
            res.json({error:ERROR_EDIT})
        }
    }else{
        res.json({error:ERROR_EDIT})
    }

})

app.listen(port, ()=>{
    console.log(`Listening to that sweet gundam noise on port ${port}`);
})

module.exports = app;