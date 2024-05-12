const data = require('../testData/testData')
module.exports = {
    getTestData(){
        return data
    },
    createTestData : ({userInput}, req )=> {
        console.log(req.method)
        const seriesTitle = userInput.seriesTitle
        const views = userInput.views
        const episodes = userInput.episodes
        // console.log(seriesTitle,views,[episodes])
        const test = { seriesTitle: seriesTitle, views: views, episodes: [{title : episodes[0].title}] }
        console.log(test)
        data.push(test)
        return data[data.length-1]

    }
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