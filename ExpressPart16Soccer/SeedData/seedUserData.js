const mongoose = require('mongoose')
const User = require('../models/user')

mongoose.connect('mongodb://localhost/soccer_trainingDb')
const listOfUsers = [
    {name:'Wallie',email:'wallie@yahoo.com',password:'1233' },
    {name:'Ronnie',email:'ronnie@yahoo.com',password:'1233' },
    {name:'William',email:'william@yahoo.com',password:'1233' },
]


const insertSeedData = () => {
    User.deleteMany({})
    .then(()=>{
        User.insertMany(listOfUsers)
            .then(() => {
                console.log('seeding has begun')
                process.exit()
            })
            .catch(console.error)
    })
    .catch(console.error)
}


insertSeedData()