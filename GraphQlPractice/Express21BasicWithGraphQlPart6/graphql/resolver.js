const data = require('../Data/data')
module.exports = {  
    getPets:function(){
        return data
    },
    getOnePet:function(args){
        let id = args.id
        console.log(id)
        return data[id-1]
    },
    getOnePets:function(args){
        let id = args.petId.id
        console.log(id)
        return data[id-1]
    },
    createPet:function(args){
        args.inputPet.id = data.length+1
        data.push(args.inputPet)
        return data
    }
}