const mongoose = require('mongoose')
const Player = require('../models/player')

mongoose.connect('mongodb://localhost/soccer_trainingDb')
const listOfPlayers = [
    {
        name: 'Messi',
        position: 'Striker',
        team: 'Argentina',
        rank: '13',
        trainingReg: ['64720cf56adb4baab86af909', '64720cf56adb4baab86af90b']
    },
    {
        name: 'Renaldo',
        position: 'Striker',
        team: 'Portugal',
        rank: '12',
        trainingReg: ['64720cf56adb4baab86af909', '64720cf56adb4baab86af90b','64720cf56adb4baab86af90a']
    },
    {
        name: 'Neymar',
        position: 'Striker',
        team: 'Brazil',
        rank: '15',
    },
]


const insertSeedData = () => {
    Player.deleteMany({})
    .then(()=>{

        Player.insertMany(listOfPlayers)
        .then(() => {
            console.log('seeding has begun')
            process.exit()
        })
        .catch(console.error)
    }).catch(console.error)
}


insertSeedData()