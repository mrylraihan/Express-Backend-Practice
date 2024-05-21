const Note = require("../models/note")
const User = require("../models/user")
const data = require('../testData/testData')
module.exports = {
    async getUserData(){
        const users = await User.find()
        // console.log(users)
        return users
    },
    async getUserDataByID(args){
        const id = args.id
        const users = await User.findById(id)
        console.log(users)
        return users
    },
    hello:function(){
        return {message:"Hello"}
    },

    getGundam:function(){
        return data
    },
    createGundam: function (args, req){
        const {gundamName, series} = args.gundamInput
        console.log({gundamName, series})
        data.push({ gundamName, series })
        return data[data.length-1]
    },
    getGundamByName: function({name}, req){
        console.log(req.query)
        console.log(req.params.id)
        let gundam = data.filter(gundam=>gundam.gundamName===name)[0]
        return gundam
    },
    getNoteData:async function(){
        const notes = await Note.find().populate('owner')
        return notes
    }
    // createTestData : ({userInput}, req )=> {
    //     console.log(req.method)
    //     const seriesTitle = userInput.seriesTitle
    //     const views = userInput.views
    //     const episodes = userInput.episodes
    //     // console.log(seriesTitle,views,[episodes])
    //     const test = { seriesTitle: seriesTitle, views: views, episodes: [{title : episodes[0].title}] }
    //     console.log(test)
    //     data.push(test)
    //     return data[data.length-1]

    // }
    // createData(args, req ){
    //     console.log(req.method)
    //     const seriesTitle = args.userInput.seriesTitle
    //     const views = args.userInput.views
    //     const episodes = args.userInput.episodes
    //     console.log(seriesTitle,views,episodes)
    //     data.push({seriesTitle,views,episodes})
    //     return data

    // }
}