const express = require('express')
const router = express.Router()
let toppings = require('../data/data')

router.get('/', (req, res)=>{
    res.json(toppings)
})

router.get('/:id', (req, res, next)=>{
    // res.json(toppings[+req.params.id]) lazy way 
    const id = req.params.id
    const topping = toppings.find(ele=>ele.id === +id)
    if(topping === undefined){
        next({ customMessage :"Sorry cant find that topping"})
    }else{
        res.json(topping)
    }
})

router.post('/',(req,res,next)=>{
    const topping = req.body
    if(topping.name && topping.description){

        const newId = toppings.length
        topping.id = newId
        toppings.push(topping)
        res.status(204)
        // res.json(toppings)if we use req.method
        next()
    }else{
        next({ customMessage: "Sorry issues with creating please try again" })
    }

})

router.patch('/:id', (req,res, next)=>{
    const editedTopping = req.body
    const id = req.params.id
    const singleTopping = toppings.find(ele=>ele.id === +id)
    if ((editedTopping.name||editedTopping.description)&&(singleTopping !== undefined)){
        for (const key in editedTopping) {
            singleTopping[key] = editedTopping[key]
        }
        res.json(toppings)
    }else{
        next({customMessage:"Error with editing topping"})
    }
})

router.delete('/:id', (req,res, next)=>{
    const id = req.params.id
    let newToppings = toppings.filter(ele=>ele.id !== +id)
    if(newToppings.length == toppings.length){
        next({customMessage:"Couldn't find your topping"})
    }else{
        toppings = newToppings
        res.redirect('/toppings')
    }
})

module.exports = router