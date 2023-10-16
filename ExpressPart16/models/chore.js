const mongoose = require('mongoose')

const choreSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    }
},
{timestamps:true}
);

const Chore = mongoose.model('Chore', choreSchema)

module.exports = Chore