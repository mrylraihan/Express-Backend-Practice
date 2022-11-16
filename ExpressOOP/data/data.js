const Hero = require('../classes/Hero')
const Villain = require('../classes/Villain')


const hero1 = new Hero('Peter Parker', 'Spider-Man', 'Spider powers', 5)

const hero2 = new Hero('Logan', 'Wolverine', 'Regenerate', 5)

const heroArray = [hero1, hero2]


const villain1 = new Villain('Eddie Brock','Venom','Venom powers', 5 )

const villain2 = new Villain('Harry Osborn','Hob Goblin','Super Strength', 5 )

const villainArray = [villain1, villain2]
console.log(heroArray);
console.log(villainArray);

module.exports = {
    heroArray,
    villainArray
}