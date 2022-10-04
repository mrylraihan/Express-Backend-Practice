const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    userName : String, 
    comment : String
});


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    comments:[
        commentSchema
    ]
},
    { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog