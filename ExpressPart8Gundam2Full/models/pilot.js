const mongoose = require('mongoose')
const pilotSchema = new mongoose.Schema({
    pilot: String,
    gundams_piloted: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Mech" },
    ],
},
    { timestamps: true }
)

const Pilot = mongoose.model("Pilot", pilotSchema)
module.exports = Pilot