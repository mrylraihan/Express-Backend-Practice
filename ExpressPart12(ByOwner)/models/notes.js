const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }, 
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User', 
        required:true
    }
},
    { timeStamps: true }
)

const Note = mongoose.model('Note', noteSchema)
module.exports = Note