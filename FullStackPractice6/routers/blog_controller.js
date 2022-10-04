const express = require('express')
const router = express.Router()

const Blog = require('../models/blog')

router.get('/', (req, res) => {
    Blog.find()
    .populate('owner')
        .then(blogs => res.json(blogs))
        .catch(err => res.json(err))
})
// get all byOwner
router.get('/:ownerID', (req, res) => {
    const ownerId = req.params.ownerID
    Blog.find({ owner: ownerId })
    .populate('owner')
        .then(blogs => res.json(blogs))
        .catch(err => res.json(err))
})
router.post('/', (req, res) => {
    const blog = req.body.blog
    Blog.create(blog)
        .then(blog => res.json(blog))
        .catch(err => res.json(err))
})
// comment on blog by user
router.put('/:blogId', (req, res)=>{
    const blogId = req.params.blogId
    const comment = req.body.comment
    Blog.findByIdAndUpdate(blogId,
        {$push:{comments:comment}}, {new:true})
        .then(updatedBlog=>res.json(updatedBlog))
        .catch(err=>res.json(err))
})


module.exports = router