const mongoose = require('mongoose');
const mechSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    pilotedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pilot',
        required: true
    }
},
    { timeStamps: true }
);

const Mech = mongoose.model('Mech', mechSchema);
module.exports = Mech