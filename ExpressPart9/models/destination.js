const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
    name:String,
    country:String,
    description:String,
    rating:Number,
    foodType:String,
    visited:{
        type:Boolean,
        required: true
    }
})

const Destinations = mongoose.model('Destination', destinationSchema)
module.exports = Destinations