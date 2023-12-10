const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/testdb2')

const Person = require('../models/person')
const Task = require('../models/task')

const firstPerson = {name:"mike"}
const secondPerson = {name:"larry"}

const taskList = [{ task: "clean clothes" }, { task: "clean dishes" }, { task: "clean bathroom" }]



const insertSeed = async () =>{
    try{
        await Person.deleteMany({})
        const [person1, person2] = await Person.insertMany([firstPerson, secondPerson])
        const mappedTask = taskList.map(ele=>{
            return {...ele, owner:person1._id}
        })
        await Task.deleteMany({})
        await Task.insertMany(mappedTask)
        await Task.insertMany([{task:"sleep",owner:person2._id }])
        console.log('seeding is starting!')
        process.exit()
    } catch (err) {
        console.log(err)
    }
}

insertSeed()