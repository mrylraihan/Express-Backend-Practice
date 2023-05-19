const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    carLineUp: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    }]
},
    {
        timestamps: true
    })

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;