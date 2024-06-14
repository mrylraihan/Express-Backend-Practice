const { buildSchema } = require('graphql')
module.exports =buildSchema( `
 type  People{
      name:String,
      age:Int
  }
`)