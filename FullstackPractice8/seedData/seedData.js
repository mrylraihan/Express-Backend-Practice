const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/notes-db2')

const Note = require('../models/note')

const noteList = [
    {title:'work out', body:' do work A'},
    {title:'cook dinner', body:'make Korean bbq'},
    {title:'build computer', body:'build custom pc'},
]

const insertData = ()=>{
    Note.deleteMany({})
    .then(()=>{
        return Note.insertMany(noteList)
    })
    .then(()=>{
        console.log('Data has been added')
        process.exit()
    })
    .catch(console.error)
}

insertData()