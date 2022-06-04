const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    scheduled: {
        type: Date,//the date is passed in like 
        required: true
    },
    // create a one to many relationship with user to events
    // use the User reference so whenever someone uses populate it will 
    // create teh object from the User models
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})
module.exports = mongoose.model('Event', eventSchema)