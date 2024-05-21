const mongoose = require('mongoose')
const Test = require('../models/test')

mongoose.connect('mongodb://localhost/testDB2024')

const createCollections = async ()=>{
    await Test.deleteMany({})
    process.exit()
}

createCollections()