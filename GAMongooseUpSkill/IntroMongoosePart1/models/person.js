'use strict'

const mongoose = require('mongoose')
// extract the Schema construtor to make it easy to create Schemas
const Schema = mongoose.Schema

// create our person schema, which defines which properties
// will be on our person documents
const personSchema = new Schema({
    // firstName: String or with validators
    firstName: {
        type: String,
        // make sure the first name is included whenever creating a person
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        //   type is js Date
        type: Date,
        required: true
    },
    height: {
        type: Number,
        required: true,
        min: 1,
        max: 120
    },
    weight: {
        type: Number,
        required: true,
        min: 1,
        max: 700
    }
}, {
    // this option adds a time stamp
    timestamps: true,
    // this is the options object with options about our schema
    // whenever mongoose uses teh toObject or tojson method of a
    // doucment make sure to include virtuals
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
})
// add the fullName Virtual
personSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName
})
// create a Person model which will be used to interact with the database later
// make sure the name is singular and capitalized
const Person = mongoose.model('Person', personSchema)

// export this person model so we can interact with our database in other files
module.exports = Person
