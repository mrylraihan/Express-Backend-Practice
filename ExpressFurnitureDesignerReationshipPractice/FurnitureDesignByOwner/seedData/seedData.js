const mongoose = require('mongoose')
const Designer = require('../models/designer')

mongoose.connect('mongodb://localhost/designerFurniture_db')

const listOfDesigners =[
    {name:"Herman Miller"},
    {name:'Florence Knoll'},
    {name: 'Ray Eames'},
]

const insertSeedData = ()=>{
    Designer.deleteMany({})
    Designer.insertMany(listOfDesigners)
    .then(()=>{
        console.log('Seeding Data');
        process.exit()
    })
    .catch(console.error)
}

insertSeedData()