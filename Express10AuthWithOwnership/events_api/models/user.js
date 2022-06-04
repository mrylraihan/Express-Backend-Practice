const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique:true
    },
    hashedPassword:{
        type:String,
        required:true
    },
    token:String
},{
    timestamps:true , 
    toJSON:{
        transform:(_doc, user)=>{
            // this will allow us to transform and modify our document/object 
            // we dont want to show our hashed password so we are removing it from the returned object
            delete user.hashedPassword
            // this will delete the hashPassword key value pair from the user object that gets returned but we are still storing it in the db 
            return user
        }
    }
})
module.exports = mongoose.model('User', userSchema)