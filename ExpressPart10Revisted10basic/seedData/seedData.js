const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/task_db_practice3')
// const Task = require('../models/task')
const User = require('../models/user')
// const taskList = [
//     { title: 'Work Out 1', body: 'Do workout A' },
//     { title: 'Express Study Session', body: 'Study Express' },
//     { title: 'React Study Session', body: 'Study React' },
//     { title: 'Cook', body: 'Make dinner' },
//     { title: 'Js Study Session', body: 'Study Js' },
//     { title: 'Work Out 2', body: 'Do workout b' },
// ]

const usersList = [
    {name:'Wallie'},
    {name:'Heshow'},
    {name:'Meshia'},
]

const insertData = () => {

    User.deleteMany({})
    .then(()=>{
        return User.insertMany(usersList)
    })
        .then(() => {
            console.log('data is seeded');
            process.exit()
        })
        .catch(console.error)
}

insertData()