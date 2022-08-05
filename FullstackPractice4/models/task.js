const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
},
{timestamps:true}
)

const Task = mongoose.model('Task', taskSchema)
module.exports = Task