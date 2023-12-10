const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    task:{
        type:String, 
        required:true
    },
    owner:{type:mongoose.Schema.Types.ObjectId, ref:"Person"}
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task