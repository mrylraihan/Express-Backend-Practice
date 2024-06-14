const {buildSchema} = require('graphql')

module.exports = buildSchema(`
    input inputPet{
        name: String
        type:String
    }
    type Pet {
        id: ID
        name: String
        type:String
    }
    input userPost{
        userId: Int,
        title: String,
        body: String,
    }
    type People{
        name:String,
        age:Int
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
        getEmptyData:[People]
        getPet:[Pet]
    }
    type RootMutation{
        createPost(title:String,body:String,userId:Int):Post
        createPost2(userInput: userPost):Post
        createPet(inputPet:inputPet):Pet
    }

    schema {
        query:RootQuery, 
        mutation: RootMutation
    }
`)