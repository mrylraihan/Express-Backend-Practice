const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/gundams2_db')
const Gundam = require('../models/gundam')
const Pilot = require('../models/pilot')

const gundamSeed = [
    {name:'Wing Gundam'},
    {name:'Sandrock Gundam'},
    {name:'HeavyArms Gundam'},
    {name:'Death Syth Gundam'},
]

const pilotSeed = [
    {pilot:'Hero Youi'},
    {pilot:'Troa Bartent'},
    {pilot:'Ahmed Ismail'},
    {pilot:'Ronnie Rio'},
]


const insertSeed = async()=>{
    try{
        await Gundam.deleteMany({})
        await Gundam.insertMany(gundamSeed)
        await Pilot.deleteMany({})
        await Pilot.insertMany(pilotSeed)
        console.log('seeding is starting!')
        process.exit()
    }catch(err){
        console.log(err)
    }
}
insertSeed()