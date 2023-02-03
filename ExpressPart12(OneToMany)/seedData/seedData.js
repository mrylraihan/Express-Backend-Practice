const mongoose = require('mongoose')
const Note = require('../models/note')
const User = require('../models/user')

mongoose.connect('mongodb://localhost/notesdb_OneToMany')

const listOfUsers =[
    {name:"Herman Miller", email:'hrm@gmail.com'},
    {name:'Florence Knoll', email:'florance@gmail.com'},
    {name: 'Ray Eames', email:'re@gmail.com'},
]
const listOfNotes =[
    {title:"Office Chair", body:'get Aeron chair'},
    {title:'Dinning Table', body:'Get Tulip Table'},
    {title: 'Chair', body:'Get Lounge Chair'},
]

const insertSeedData = ()=>{
    Note.deleteMany({})
    Note.insertMany(listOfNotes)
    .then(()=>{
        console.log('Seeding Data for Notes');
        process.exit()
    })
    .catch(console.error)

    User.deleteMany({})
    User.insertMany(listOfUsers)
    .then(()=>{
        console.log('Seeding Data for Users');
        process.exit()
    })
    .catch(console.error)
}

insertSeedData()