const mongoose = require('mongoose');
// set db connection 
mongoose.connect('mongodb://localhost/vacations_db');
// require our schema to we know where we want to seed our data too, which specific collection
const Destination = require('../models/destination');

const destinationData = [
    {
        name: 'Sanna',
        country: 'Yemen',
        description: 'Middle east, and sandy',
        rating: 5,
        coordinates: {
            latitude: '10.234 N',
            longitude: '11.989 W'
        },
        visited:false
    },
    {
        name: 'Khartoom',
        country: 'Sudan',
        description: 'Middle east, and Africa',
        rating: 5,
        coordinates: {
            latitude: '10.234 N',
            longitude: '11.989 W'
        },
        visited:true
    },
]

const insertSeed = async ()=>{
    try{
        // this will make sure any data that we added prior gets deleted 
        await Destination.deleteMany({})
        await Destination.insertMany(destinationData)
        console.log('Seeding is starting');
        // this will close the connection to the db 
        process.exit()
    }catch(err){
        console.log(err);
    }
}

insertSeed()