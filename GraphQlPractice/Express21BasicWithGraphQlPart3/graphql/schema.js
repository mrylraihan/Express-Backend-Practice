const { buildSchema } = require('graphql')

module.exports = buildSchema(`

type Gundam{
    gundamName: String
    series: String
}
input InputGundam{
    gundamName: String
    series: String
}
type UserData {
    _id:ID
    userName:String
    email:String
    password:String
    createdAt:String
    updatedAt:String
}
type Note{
    _id:ID
    title:String
    description:String
    owner:UserData
    createdAt:String
    updatedAt:String
    
}
type helloData{
    message:String
}
type RootMutation {
        createGundam(gundamInput: InputGundam):Gundam
}
type RootQuery{
        getNoteData:[Note]
        getUserData:[UserData]
        getUserDataByID(id:ID):UserData
        getGundam:[Gundam]
        getGundamByName(name:String):[Gundam]
        hello:helloData
    }
schema {
        query: RootQuery
        mutation: RootMutation
    }
`)