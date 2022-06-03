const mongoose = require('mongoose')
const db = require('../config/db')
mongoose.connect(db)
const User = require('../models/user')

const cleanDB = async ()=>{
    try{
        await User.deleteMany({})
        console.log('seeding is starting!')
        process.exit()
    }catch(err){
        console.log(err);
    }
}

cleanDB()