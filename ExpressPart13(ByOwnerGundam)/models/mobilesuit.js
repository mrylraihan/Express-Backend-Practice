const mongoose = require('mongoose');
const mobileSuitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    pilotedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Pilot',
        required: true
    }
},
    { timeStamps: true }
);

const MobileSuit = mongoose.model('MobileSuit', mobileSuitSchema);
module.exports = MobileSuit