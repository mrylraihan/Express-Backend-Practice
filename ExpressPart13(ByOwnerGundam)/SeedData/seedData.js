const mongoose = require('mongoose')
const Pilot = require('../models/pilot')
const MobileSuit = require('../models/mobilesuit')
mongoose.connect('mongodb://localhost/mongo_Gundam2')

const listOfPilots = [
    {pilot:'Hero Yuy', series:'Gundam Wing'},
    {pilot:'Duo Maxwell', series:'Gundam Wing'},
    {pilot:'Trowa Barton', series:'Gundam Wing'},
    {pilot:'Quatre Raberba Winner', series:'Gundam Wing'},
    {pilot:'Chang Wufei', series:'Gundam Wing'},
    {pilot:'Treize Khushrenada', series:'Gundam Wing'},
    {pilot:'Zechs Merquise', series:'Gundam Wing'},
]

const listOfGundams = [
    { name: 'Wing Gundam', type: 'Gundam', pilotedBy: "642ae5adab6a9045329a3fb0" },
    { name: 'Sandrock', type: 'Gundam', pilotedBy: "642ae5adab6a9045329a3fb3" },
    { name: 'Heavyarms', type: 'Gundam', pilotedBy: "642ae5adab6a9045329a3fb2" },
    { name: 'Shenlong', type: 'Gundam', pilotedBy: "642ae5adab6a9045329a3fb4" },
    { name: 'Deathscythe', type: 'Gundam', pilotedBy: "642ae5adab6a9045329a3fb1" },
    { name: 'Tallgeese', type: 'Gundam', pilotedBy: "642ae5adab6a9045329a3fb6" },
]

const insertPilotData = ()=>{
    Pilot.deleteMany({})
    Pilot.insertMany(listOfPilots)
    .then(()=>{
        console.log('Seeding Data')
        process.exit()
    })
    .catch(console.error)
}
// insertPilotData()
const insertGundamData = ()=>{
    MobileSuit.deleteMany({})
    MobileSuit.insertMany(listOfGundams)
    .then(()=>{
        console.log('Seeding Data')
        process.exit()
    })
    .catch(console.error)
}


insertGundamData()