const graphql = require('graphql')
const buildSchema = graphql.buildSchema

module.exports = buildSchema(`
    input inputPet{
        name: String
        type:String
    }
    input petId {
        id: Int
    }
    type Pet {
        id: ID
        name: String
        type:String
    }

    type RootQuery{
        getPets:[Pet]
        getOnePet(id:Int):Pet
        getOnePets(petId:petId):Pet
    }
    type RootMutation{
        createPet(inputPet:inputPet):[Pet]
    }
    schema{
        query:RootQuery
        mutation:RootMutation
    }
`)