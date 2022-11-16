const SuperHuman = require('./SuperHuman')
class Hero extends SuperHuman{
    constructor(name, heroName, power, level) {
        super(name, power, level);
        this.heroName = heroName;
    }
}

module.exports = Hero