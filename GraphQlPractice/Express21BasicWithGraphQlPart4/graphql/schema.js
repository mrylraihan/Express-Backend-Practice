const {buildSchema} = require('graphql')

module.exports = buildSchema(`
    input userPost{
        userId: Int,
        title: String,
        body: String,
    }
    type Post {
        id: ID,
        userId: Int,
        title: String,
        body: String,
    }
    type RootQuery{
        getPost:[Post],
        getPostById(id:ID):Post
        getPostByTitle(title:String):Post
        getPostByUserId(userId:Int):[Post]
        getError:String
    }
    type RootMutation{
        createPost(title:String,body:String,userId:Int):Post
        createPost2(userInput: userPost):Post
    }

    schema {
        query:RootQuery, 
        mutation: RootMutation
    }
`)