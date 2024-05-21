const mongoose = require('mongoose')

const testSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }
}, {
    timestamps: true, //createdAt & updatedAt will be added to the schema automatically
})
const Test = mongoose.model('Test', testSchema)
module.exports = Test