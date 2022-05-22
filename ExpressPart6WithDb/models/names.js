const mongoose = require('mongoose');

const nameSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
},
    { timestamps: true }
    )

const Name = mongoose.model('Name', nameSchema);

module.exports = Name