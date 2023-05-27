const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    trainingReg: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkOut',
        // required: true
    }]
},
    {
        timestamps: true
    })

const Player = mongoose.model('Player', playerSchema);
module.exports = Player;