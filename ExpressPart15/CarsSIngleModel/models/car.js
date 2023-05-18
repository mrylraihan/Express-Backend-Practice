const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    model:{
        type:String,
        required:true
    },
    type:{
        type: String,
        required: true
    },
    engine:{
        type: String,
        required: true
    },
    brand:{
        type: String,
        required: true
    }
},
{
    timestamps:true
})

const Car = mongoose.model('Car', carSchema);
module.exports = Car;