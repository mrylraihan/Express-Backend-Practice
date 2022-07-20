const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/task_db')
const Task = require('../models/task')


const taskList = [
    {title:'make coffee', body:'use coffee machine to make coffee'},
    {title:'workout', body:'shoulders and back workouts'},
    {title:'code', body:'study fullstack'},
]

const insertSeedData = ()=>{
    Task.deleteMany({})
    .then(()=>{
        return Task.insertMany(taskList)
    }).then(()=>{
        console.log('seeding is starting');
        process.exit()
    })
    .catch(console.error)
}

insertSeedData()