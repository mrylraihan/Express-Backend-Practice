const mongoose = require('mongoose');
const pilotSchema = new mongoose.Schema({
 pilot:{
    type:String,
    required:true
 },
 series:{
    type:String,
    required:true
 }
},
    { timeStamps: true }
);

const Pilot = mongoose.model('Pilot', pilotSchema );
module.exports = Pilot;