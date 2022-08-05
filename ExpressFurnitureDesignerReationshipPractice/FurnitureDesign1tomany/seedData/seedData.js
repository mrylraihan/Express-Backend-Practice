const mongoose = require('mongoose')
const Designer = require('../models/designer')
const Furniture = require('../models/furniture')

mongoose.connect('mongodb://localhost/designerFurniture_db2')

const listOfDesigner = [
    {name:'Herman Miller'},
    {name:'Florence Knoll'},
    {name:'Hisham Raihan'},
    {name:'Ray Eames'}
]

const listOfFurniture = [
    {name:'Eames lounge chair', type:'lounge chair', price:7500},
    {name:'Eames tupil table', type:'dinning table', price:9500},
    {name:'Eames coffee table', type:'coffee table', price:3500},
    {name:'Areon Chair', type:'Office chair', price:1500},
    {name:'Embody Chair', type:'Office chair', price:2000},
    {name:'Mirro Chair', type:'Office chair', price:1000},
]

const insertSeedData = ()=>{
    Designer.deleteMany({})
    Designer.insertMany(listOfDesigner)
    .then(()=>{
        console.log('seeding designers is starting');
        process.exit()
    })
}
const insertSeedDataFurniture = ()=>{
    Furniture.deleteMany({})
    Furniture.insertMany(listOfFurniture)
    .then(()=>{
        console.log('seeding designers is starting');
        process.exit()
    })
}

insertSeedData()
insertSeedDataFurniture()