const mongoose = require('mongoose')

const exampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Example2', exampleSchema)
