const data = require("../Data/data")
const data2 = require('../Data/data2')
module.exports = {
    getPost:function(){
        return data
    },
    getPostById:function({id}, req){
        // console.log(id)
        return data.find((post) => post.id == id)
    },
    getPostByUserId:function({userId}, req){
        return data.filter((post) => post.userId == userId)
    },
    getPostByTitle:function({title}, req){
        return data.find((post) => post.title == title)
    },
    createPost:function({title, body, userId}){
        let newData = { title , body,userId, id: data.length}
        data.push(newData)
        return newData
    },
    createPost2: function ({ userInput }){
        let newData = { title: userInput.title,body: userInput.body,userId:userInput.userId, id: data.length+1}
        data.push(newData)
        return newData
    },
    getError: function (args) {
        // if (args.isWrong) {
            const error = new Error('This doesnt work')
            throw error
        // }
        // return 'did not work right'
    },
    getEmptyData:function(){
        return data2
    },
    getPet:function(args){
        return data2
    },
    createPet: function ({ inputPet }, req){
        inputPet.id = data2.length+1
        data2.push(inputPet)
        return inputPet
    }

}