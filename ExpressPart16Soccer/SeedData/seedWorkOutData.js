const mongoose = require('mongoose')
const WorkOut = require('../models/workout')

mongoose.connect('mongodb://localhost/soccer_trainingDb')
const listOfWorkOuts = [
    { name: 'Jogging', description: 'Jogging 1 mile per set', reps: 5,sets:5 },
    { name: 'Bench Press', description: 'unassisted with a barbell, or free weight', reps: 4,sets:5 },
    { name: 'Squats', description: 'free weighted with bar', reps: 5,sets:5 },
      
]


const insertSeedData = () => {
    WorkOut.deleteMany({})
    .then(()=>{

        WorkOut.insertMany(listOfWorkOuts)
        .then(() => {
            console.log('seeding has begun')
            process.exit()
        })
        .catch(console.error)
    }).catch(console.error)
}


insertSeedData()