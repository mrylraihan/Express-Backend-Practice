const SuperHuman = require('./SuperHuman')
class Villain extends SuperHuman{
constructor(name, villainName, power, level) {
    super(name, power, level);
    this.villainName = villainName;
}

}
module.exports = Villain