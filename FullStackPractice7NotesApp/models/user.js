const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    userName:{
        type: String,
        required: true,
        unique: true
    },
    passWord:{
        type: String,
        required: true,
    }
},
    { timestamps: true }
)


const User = mongoose.model('User', userSchema)
module.exports = User