const mongoose = require('mongoose')

const designerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    designedFurniture:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Furniture'
        }
    ]
},{
    timestamps:true
})

const Designer = mongoose.model('Designer', designerSchema)

module.exports = Designer