const mongoose = require('mongoose')

const characterSchema = new mongoose.Schema({
    name:String 
}, 
{timestamps:true}
)

const Character = mongoose.model("Character", characterSchema)
module.exports = Character