const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{
    timestamps: true, //createdAt & updatedAt will be added to the schema automatically
})
const User = mongoose.model('User', userSchema)
module.exports = User