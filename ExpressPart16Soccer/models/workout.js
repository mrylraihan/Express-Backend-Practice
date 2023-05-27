const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    sets: {
        type: Number,
        required: true
    }
},
    {
        timestamps: true
    })

const Player = mongoose.model('WorkOut', workoutSchema);
module.exports = Player;