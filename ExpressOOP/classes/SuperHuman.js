const SuperPower = require('./SuperPower')
class SuperHuman{
    constructor(name,power,level){
        this.name = name;
        this.superPower = new SuperPower(power,level)
    }

    details(){
        return `hey im ${this.name} and my power is ${this.superPower.power}`
    }
}

module.exports = SuperHuman