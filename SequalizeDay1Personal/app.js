const Chore = require('./models/choresModel');
const {sequelize, testConnection} = require('./models/conn')


testConnection()

//Retrieving Data
const findChores = async () => {
    const result = await Chore.findAll();
    console.log(JSON.stringify(result));
}

// findChores()

//Creating data
const createNewChore = async () => {
    await Chore.create({
        name: "laundry"
    });
    findChores();
}

createNewChore()