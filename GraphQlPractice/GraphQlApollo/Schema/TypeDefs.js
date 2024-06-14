const {gql} = require('apollo-server-express')

const typeDefs = gql`
    input inputUser{
        name:String
        age:Int
    }
    type Person{
        name:String
        age:Int
    }
    
    type Query{
        getPeople:[Person]
    }
    type Mutation{
        addPerson(name:String, age:Int):Person
        addPerson2(inputUser:inputUser):Person
    }

   
`

module.exports = typeDefs