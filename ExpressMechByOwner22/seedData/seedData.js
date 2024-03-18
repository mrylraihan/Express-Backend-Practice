const mongoose = require('mongoose')
const Pilot = require('../models/pilot')

mongoose.connect("mongodb://localhost/GundamNextjsProject2024")

const listOfPilots = [
    { pilot: 'Hero Yuy', series: 'Gundam Wing', img:"https://i.redd.it/77y1raz87op81.jpg" },
    { pilot: 'Duo Maxwell', series: 'Gundam Wing', img:"https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/01/Duo-Maxwell-5.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5"},
    { pilot: 'Trowa Barton', series: 'Gundam Wing', img:"https://static.wikia.nocookie.net/gundam/images/5/5a/Trowa_child.png/revision/latest/scale-to-width-down/1000?cb=20200425103858"},
   
]

const insertPilotData = () => {
    Pilot.deleteMany({})
    Pilot.insertMany(listOfPilots)
        .then(() => {
            console.log('Seeding Data')
            process.exit()
        })
        .catch(console.error)
}

insertPilotData()