const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get('/', (req,res)=>{
    User.find().select('-__v')
    .then(userList=>res.json(userList))
    .catch(err=>res.json(err))
})

//.select() will remove the property in your returned object 
// takes in a string value and you have to tack - before it 
router.get('/id', (req, res)=>{
    User.findOne({_id:req.body.id}).select('-__v')// will return an array 
    .then(result=>res.json(result))//pulling out the object from the array
    .catch(err => res.json(err))
})

router.get('/:id', (req, res)=>{
    User.findOne({_id:req.params.id}).select('-__v')// will return an array 
    .then(result=>res.json(result))//pulling out the object from the array
    .catch(err => res.json(err))
})

// router.get('/:id', (req, res)=>{
//     User.find({_id:req.params.id})// will return an array 
//     .then(result=>res.json(result[0]))//pulling out the object from the array
//     .catch(err => res.json(err))
// })

// router.get('/:id', (req, res)=>{
//     User.find({_id:req.params.id})// will return an array 
//     .then(result=>res.json(result))
//     .catch(err => res.json(err))
// })
// router.get('/:id', (req, res)=>{
//     User.findById({_id:req.params.id})// you can pass in an object
//     .then(result=>res.json(result))
//     .catch(err => res.json(err))
// })

// router.get('/:id', (req, res)=>{
//     User.findById(req.params.id)
//     .then(result=>res.json(result))
//     .catch(err => res.json(err))
// })

router.post('/', (req, res)=>{
    User.create(req.body.user)
    .then(user=>res.json(user))
    .catch(err=>re.json(err))
})

router.put('/:id', (req,res)=>{
    User.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
    .then(newUser=>res.json(newUser))
    .catch(err=>res.json(err))
})
// router.put('/:id', (req,res)=>{
//     User.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true})
//     .then(newUser=>res.json(newUser))
//     .catch(err=>res.json(err))
// })
router.patch('/:id', (req,res)=>{
    User.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true})
    .then(newUser=>res.json(newUser))
    .catch(err=>res.json(err))

})

router.delete('/:id', (req, res) => {
    User.deleteOne({_id:req.params.id})
        .then(user => res.json(user))
        .catch(err => re.json(err))
})

module.exports = router