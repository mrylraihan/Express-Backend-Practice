const express = require('express')
const router = express.Router()
let data = require('../data/data')

router.get('/', (req,res, next)=>{

    // next({data:data, message:"Here's the menu"})//res.json is like a return 
    next({ message: "Here's all our works" })
    res.json(data)
    // console.log(data)
    // next()
})

router.get('/:id', (req,res,next)=>{
    const id= req.params.id;
    const singleData = data.find(ele=>ele.id == +id)
    if(!singleData){
        next({ customMessage:"Couldn't find person"})
        // next()//hits sorry route not found
    }else{
        res.json(singleData)
    }
})

router.post('/', (req,res, next)=>{
    const person = req.body
    if (person.name && person.age) {

        const newId = data.length
        person.id = newId
        data.push(person)
        // res.json(toppings)if we use req.method
        next({message: "Here's the new Worker" })
        res.json(person)
    } else {
        next({ customMessage: "Sorry issues with creating please try again" })
    }
})


router.patch('/:id', (req, res, next) => {
    const person = req.body
    const id = req.params.id
    const singlePerson = data.find(ele => ele.id === +id)
    if ((person.name || person.age) && (singlePerson !== undefined)) {
        for (const key in person) {
            singlePerson[key] = person[key]
        }
        res.json(data)
    } else {
        next({ customMessage: "Error with editing person" })
    }
})

router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    let newList = data.filter(ele => ele.id !== +id)
    if (newList.length == data.length) {
        next({ customMessage: "Couldn't find your person" })
    } else {
        data = newList
        // res.redirect('/test')
        res.json(data)
    }
})

module.exports = router