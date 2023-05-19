const mongoose = require('mongoose')
const Brand = require('../models/brand')
const Car = require('../models/car')

mongoose.connect('mongodb://localhost/carDealerShip_db3')
const listOfBrands = [
    { brand: "Tesla", carLineUp: ["6467d7ae508416d6ef48539f", "6467d7ae508416d6ef4853a0", "6467d7ae508416d6ef4853a1", "6467d7ae508416d6ef4853a2"] },
    { brand: "Ford" },
    { brand: "Pole Star" },

]
const listOfCars = [
    {
        model:'Model 3',
        type:'Sudan',
        engine:'Electric',
        brandBy:'6465022bfbd5ac7dfde10763'
    },
    {
        model:'Model Y',
        type:'SUV',
        engine:'Electric',
        brandBy:'6465022bfbd5ac7dfde10763'
    },
    {
        model:'Model S',
        type:'Sudan',
        engine:'Electric',
        brandBy:'6465022bfbd5ac7dfde10763'
    },
    {
        model:'Model X',
        type:'SUV',
        engine:'Electric',
        brandBy:'6465022bfbd5ac7dfde10763'
    },
]

const insertSeedData = () => {
    Brand.deleteMany({})
    Brand.insertMany(listOfBrands)
        .then(() => {
            console.log('seeding has begun')
            process.exit()
        })
        .catch(console.error)
}

// insertSeedData()
// const insertSeedData = () => {
//     Car.deleteMany({})
//     Car.insertMany(listOfCars)
//         .then(() => {
//             console.log('seeding has begun')
//             process.exit()
//         })
//         .catch(console.error)
// }

insertSeedData()