const express = require('express')
const router = express.Router()

const Blog = require('../models/blog')

router.get('/', (req, res)=>{
    Blog.find()
    .then(blogList=>res.json(blogList))
    .catch(err=>res.json(err))
})
router.get('/:id', (req, res)=>{
    const id = req.params.id
    Blog.findById(id)
    .then(blogList=>res.json(blogList))
    .catch(err=>res.json(err))
})
// find comment by id
router.get('/:id/:commentId', (req, res)=>{
    const id = req.params.id
    const commentId = req.params.commentId
    Blog.findById(id)
    .then(blogList=>{
        //.id a mongoose method for sub-documents
       const comment =  blogList.comments.id(commentId)
        res.json(comment)})
    .catch(err=>res.json(err))
})
// router.get('/:id/:commentId', (req, res)=>{
//     const id = req.params.id
//     const commentId = req.params.commentId
//     Blog.findById(id)
//     .then(blogList=>{
//         //find is an array method not a mongoose method
//        const comment =  blogList.comments.find(com=>com._id == commentId)
//         res.json(comment)})
//     .catch(err=>res.json(err))
// })

router.post('/', (req, res) => {
    const blog = req.body
    Blog.create(blog)
        .then(blog => res.json(blog))
        .catch(err => res.json(error))
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const comment = req.body
    Blog.findByIdAndUpdate(id,
        {$push:{comments:comment}}
        ,{ new: true })
        .then(newBlog => res.json(newBlog))
        .catch(error => res.json(error))
})

// delete a comment
router.delete('/:id/:commentId', (req, res) => {
    const id = req.params.id
    const commentID = req.params.commentId
    //pass in the blog id first
    Blog.findByIdAndUpdate(id,
        // then do a pull to remove the specific comment with the comment id
        { $pull: { comments: {_id : commentID }}}
        ,{ new: true })
        .then(newBlog => res.json(newBlog))
        .catch(error => res.json(error))
})

// delete post
router.delete('/:id', (req,res)=>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then(deletedBlog=>res.json(deletedBlog))
    .catch(error=>res.json(error))
})

module.exports = router