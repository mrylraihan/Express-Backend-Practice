const mongoose = require('mongoose')

const furnitureSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }, 
    type:{
        type:String, 
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    designedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Designer',
        required:true
    }
}, {
    timestamps: true
})

const Furniture = mongoose.model('Furniture', furnitureSchema)
module.exports = Furniture