'use strict'
const mongoose = require('mongoose')
// extract the Schema constructor to make it easier to create Schemas
const Schema = mongoose.Schema

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    latitude: {
      type: String,
      required: true
    },
    longitude: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: false
    }
  },
  {
    // add createdAt and updatedAt timestamps to documents
    timestamps: true,
    // whenever mongoose uses the `toObject` or `toJSON` method of a document,
    // make sure to include the `virtuals`
    // this is when we try to convert the toObject into a toJSON.
    // This will include virtuals when console.logging
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
)

placeSchema.virtual('isNorthernHemisphere').get(function () {
  if (this.latitude.includes('N')) {
    return `${this.name} is in the Northern Hemisphere`
  } else {
    return `${this.name} isn't in the Northern Hemisphere`
  }
})

placeSchema.virtual('isWesternHemisphere').get(function () {
  if (this.longitude.includes('W')) {
    return `${this.name} is in the Western Hemisphere`
  } else {
    return `${this.name} isn't in the Western Hemisphere`
  }
})

const Place = mongoose.model('Place', placeSchema)

module.exports = Place

// name (required)
// latitude (required)
// longitude (required)
// country
// isNorthernHemisphere? (virtual)
// isWesternHemisphere? (virtual)
