const data = require('../data/data')

const isLive = (req, res)=>{
res.json({message:"Router is live"})
}
const getData = (req, res)=>{
res.json(data)
}
const findById = (req, res)=>{
res.json({id:req.params.id})
}

module.exports = { isLive, getData, findById }