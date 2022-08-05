const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/task_db_practice2')
const Task = require('../models/task')

const taskList = [
    {title:'Work Out 1', body:'Do workout A'},
    {title:'Express Study Session', body:'Study Express'},
    {title:'React Study Session', body:'Study React'},
    {title:'Cook', body:'Make dinner'},
    {title:'Js Study Session', body:'Study Js'},
    {title:'Work Out 2', body:'Do workout b'},
]

const insertData=()=>{
    Task.deleteMany({})
    .then(()=>{
        return Task.insertMany(taskList)
    })
    .then(()=>{
        console.log('data is seeded');
        process.exit()
    })
    .catch(console.error)
}

insertData()