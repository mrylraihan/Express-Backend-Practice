// require mongoose to use mongoose methods to create a schema 
const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
    name:String,
    country:String, 
    description:String,
    rating:Number,
    coordinates:{
        latitude:String, 
        longitude:String
    },
    visited:{
        type:Boolean,
        require:true
    }
},
{timestamps:true}
);

const Destination = mongoose.model('Destination', destinationSchema);

module.exports = Destination;
