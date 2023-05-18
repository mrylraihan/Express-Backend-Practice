const mongoose = require('mongoose')
const Car = require('../models/car')

mongoose.connect('mongodb://localhost/carDealerShip_db1')

const listOfCars = [
    {
        model:'Model 3',
        type:'Sudan',
        engine:'Electric',
        brand:'Tesla'
    },
    {
        model:'Model Y',
        type:'SUV',
        engine:'Electric',
        brand:'Tesla'
    },
    {
        model:'Model S',
        type:'Sudan',
        engine:'Electric',
        brand:'Tesla'
    },
    {
        model:'Model X',
        type:'SUV',
        engine:'Electric',
        brand:'Tesla'
    },
]

const insertSeedData = ()=>{
    Car.deleteMany({})
    Car.insertMany(listOfCars)
    .then(()=>{
        console.log('seeding has begun')
        process.exit()
    })
    .catch(console.error)
}

insertSeedData()