const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    destination_visited:[
        {type:mongoose.Schema.Types.ObjectId, ref:"Destination"},
    ]
},
{timestamps:true}
)
const User = mongoose.model('User', userSchema)
module.exports = User