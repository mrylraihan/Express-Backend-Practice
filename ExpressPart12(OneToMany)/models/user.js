const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    notes:[
       {type:mongoose.Schema.Types.ObjectId, ref:"Note"}
    ],
},
    { timeStamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User