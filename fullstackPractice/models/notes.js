const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        required:true
    }
},
{timestamps:true}
)

const Notes = mongoose.model('Notes', notesSchema)

module.exports = Notes