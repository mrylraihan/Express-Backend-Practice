const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" } 
});

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    body:{
        type: String,
        require: true
    },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    comments: [ commentSchema ]

},
    { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog