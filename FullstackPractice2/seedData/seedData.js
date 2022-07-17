const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/task_db_practice')
const Task = require('../models/task')

const taskList = [
    { title: 'do laundry', body: 'get all the dirty clothes and clean them' },
    { title: 'cook dinner', body: 'cook for the family at 6' },
    { title: 'watch 1 episode of anime', body: 'have down time to enjoy your self' },
    { title: 'workout', body: 'work out b today' },
]

const insertSeed = ()=>{
    Task.deleteMany({})
    .then(()=>{
      return Task.insertMany(taskList)
    }).then(()=>{
        console.log('seeding is starting!')
        process.exit()
    })
    .catch(console.error)
}

insertSeed()