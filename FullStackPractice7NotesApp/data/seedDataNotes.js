const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/notes-db2')
const Note = require('../models/note')

const noteList = [
    { title: 'do Laundry', body: 'clean clothes', owner:'6388d89d8b8b3f818b763c19'},
    { title: 'clean house', body: 'clean entire crib', owner:'6388d89d8b8b3f818b763c19'},
    { title: 'eat lunch', body: 'buy food', owner:'6388d89d8b8b3f818b763c19'},
    { title: 'do Laundry', body: 'clean clothes', owner:'6388d89d8b8b3f818b763c1a'},
    { title: 'clean house', body: 'clean entire crib', owner:'6388d89d8b8b3f818b763c1a'},
    { title: 'eat lunch', body: 'buy food', owner:'6388d89d8b8b3f818b763c1a'},
]

const insertData = () =>{
    Note.deleteMany({})
    .then(()=>{
        return Note.insertMany(noteList)
    })
    .then(()=>{
        console.log('data is seeded');
        process.exit()
    })
    .catch(console.error)
}

insertData()