const mongoose = require('mongoose')
const Note = require('../models/note')
const User = require('../models/user')
mongoose.connect('mongodb://localhost/testDB2024')

const userList = [
    { userName: "wallie001", email: "wallie@gmail.com", password: "wallie001" },
    { userName: "heshow001", email: "heshow@gmail.com", password: "heshow001" },
    { userName: "meshia001", email: "meshia@gmail.com", password: "meshia001" },
]
const noteList = [
    { title: "do React studying", description: "Study React" },
    { title: "do Next studying", description: "Study Next" },
    { title: "do AWS studying", description: "Study AWS" },
]

const seedData = async () => {

    console.log(Note)
    console.log(User)
    await User.deleteMany({})
    const newUserList = await User.insertMany(userList)
    console.log(newUserList)
    console.log('seeding is Users!')
    await Note.deleteMany({})
    const mappedNoteList = noteList.map((ele, idx) => {
        ele.owner = newUserList[idx]._id
    return ele
    })
    const newNoteList =  await Note.insertMany(mappedNoteList)
    console.log(newNoteList)
    process.exit()

}
seedData()