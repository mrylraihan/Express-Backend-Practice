const mongoose = require('mongoose');
// set db connection 
mongoose.connect('mongodb://localhost/chores_db');
// require our schema to we know where we want to seed our data too, which specific collection
const Chore = require('../models/chore')

const choreList = [
    {title: 'Clean Clothes' },
    {title: 'Clean Rugs' },
    {title: 'Clean Fridge'},
    {title: 'Clean Bathroom' },
    {title: 'Clean Bedroom' },
]


const insertSeed = async () => {
    try {
        // this will make sure any data that we added prior gets deleted 
        await Chore.deleteMany({})
        await Chore.insertMany(choreList)
        console.log('Seeding is starting');
        // this will close the connection to the db 
        process.exit()
    } catch (err) {
        console.log(err);
    }
}

insertSeed()