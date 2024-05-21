const {buildSchema} = require('graphql')

//   input InputEpisode {
//     title: String!
// }

//     input TestInputData{
//     seriesTitle: String!
//     views: Int!
//     episodes: [InputEpisode]
// }


module.exports = buildSchema(`
    
    type Episode {
        title:String
    }
    
    input InputEpisode {
    title: String
    }

    input TestInputData{
    seriesTitle: String
    views: Int
    episodes: [InputEpisode]
    }

    type TestData {
        seriesTitle:String
        views:Int
        episodes:[Episode]
    }

    type RootMutation {
        createTestData(userInput: TestInputData):TestData
    }

    type RootQuery{
        getTestData:[TestData]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`)
