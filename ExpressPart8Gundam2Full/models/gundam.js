const mongoose = require('mongoose')
const gundamSchema = new mongoose.Schema({
    name: String
},
    { timestamps: true }
)

const Gundam = mongoose.model("Mech", gundamSchema)
module.exports = Gundam