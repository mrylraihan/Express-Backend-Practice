const Note = require("../models/note")
const User = require("../models/user")
const data = require('../testData/testData')
module.exports = {
    getUserData: async function () {
        const users = await User.find()
        // console.log(users)
        return users
    },
    getUserDataByID: async function (args) {
        const id = args.id
        const users = await User.findById(id)
        console.log(users)
        return users
    },
    hello: function () {
        return { message: "Hello" }
    },

    getGundam: function () {
        return data
    },
    createGundam: function (args, req) {
        const { gundamName, series } = args.gundamInput
        console.log({ gundamName, series })
        data.push({ gundamName, series })
        return data[data.length - 1]
    },
    getGundamByName: function ({ name }, req) {
        console.log(req.query)
        console.log(req.params.id)
        let gundam = data.filter(gundam => gundam.gundamName === name)[0]
        return gundam
    },
    getNoteData: async function () {
        const notes = await Note.find().populate('owner')
        return notes
    }

}