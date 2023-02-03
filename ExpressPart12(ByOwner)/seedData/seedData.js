const mongoose = require('mongoose')
const User = require('../models/user')

mongoose.connect('mongodb://localhost/notesdb_ByOwner')

const listOfUsers =[
    {name:"Herman Miller", email:'hrm@gmail.com'},
    {name:'Florence Knoll', email:'florance@gmail.com'},
    {name: 'Ray Eames', email:'re@gmail.com'},
]

const insertSeedData = ()=>{
    User.deleteMany({})
    User.insertMany(listOfUsers)
    .then(()=>{
        console.log('Seeding Data');
        process.exit()
    })
    .catch(console.error)
}

insertSeedData()