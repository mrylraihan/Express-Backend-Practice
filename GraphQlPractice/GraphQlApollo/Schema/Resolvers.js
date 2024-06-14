const data = require("../Data/data")

module.exports = {
    Query:{
        getPeople:function(){
            return data
        },

    },
    Mutation: {
        addPerson:function(parent,args){
            const {name, age} = args
            data.push({name, age})
            return data[data.length-1]
        },
        addPerson2:function(parent,args){
            const { name, age } = args.inputUser
            data.push({name, age})
            return data[data.length-1]
        },
    }
}