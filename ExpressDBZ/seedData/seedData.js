const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/dbz_db')
const Character = require('../models/character')

const dbzCharacters = [
    {name:'Goku'},
    {name:'Gohan'},
    {name:'Vegita'},
    {name:'Krilin'},
    {name:'Trunks'},
]

const insertSeed = async()=>{
    try{
        await Character.deleteMany({})
        await Character.insertMany(dbzCharacters)
        console.log('seeded data was submitted');
        process.exit()
    }catch(err){
        console.log(err);
    }
}
insertSeed()