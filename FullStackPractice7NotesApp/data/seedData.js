const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/notes-db2')
const User = require('../models/user')

const userList = [
    {email:'wallie@gmail.com', userName:'wallie', passWord:'gundam'},
    {email:'daniel@gmail.com', userName:'daniel', passWord:'gundam'},
    {email:'ronnie@gmail.com', userName:'ronnie', passWord:'gundam'},
]

const insertData = () =>{
    User.deleteMany({})
    .then(()=>{
        return User.insertMany(userList)
    })
    .then(()=>{
        console.log('data is seeded');
        process.exit()
    })
    .catch(console.error)
}

insertData()