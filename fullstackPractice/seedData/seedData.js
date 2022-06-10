const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/notes-db')
const Notes = require('../models/notes')


const notesSeed = [
    {title:'do laundry', body:'get all the dirty clothes and clean them'},
    {title:'cook dinner', body:'cook for the family at 6'},
    {title:'watch 1 episode of anime', body:'have down time to enjoy your self'},
    {title:'workout', body:'work out b today'},

]




const insertSeed = async()=>{
    try{
        await Notes.deleteMany({})
        await Notes.insertMany(notesSeed)
        console.log('seeding is starting!')
        process.exit()
    }catch(err){
        console.log(err)
    }
}
insertSeed()