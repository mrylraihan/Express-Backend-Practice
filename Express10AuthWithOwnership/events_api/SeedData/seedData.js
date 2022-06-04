const mongoose = require('mongoose')
const db = require('../config/db')
mongoose.connect(db)
const User = require('../models/user')
const Event = require('../models/event')

const cleanDB = async ()=>{
    try{
        await User.deleteMany({})
        await Event.deleteMany({})
        console.log('seeding is starting!')
        process.exit()
    }catch(err){
        console.log(err);
    }
}

cleanDB()