// //index.js
// const { sequelize, testConnection } = require("./conn");

// testConnection();

//index.js
const { sequelize, testConnection } = require("./conn");
const Category = require("./categoryModel");
const Item = require("./itemModel.js");

testConnection();

//Retrieving Data
const findCategories = async () => {
    const result = await Category.findAll();
    console.log(JSON.stringify(result));
}

// findCategories();

const findCategoriesByName = async () => {
    const result = await Category.findAll({ where: { name: "fruits" } });
    console.log(JSON.stringify(result));
}

// findCategoriesByName();

//Creating data
const createNewCategory = async () => {
    await Category.create({
        name: "candy"
    });
    findCategories();
}

// createNewCategory();

//Editing data
const updatingCategory = async () => {
    await Category.update({ name: "meats" }, { where: { id: 3 } });
    findCategories();
}

// updatingCategory();

//Deleting data
const deleteCategory = async () => {
    await Category.destroy({ where: { id: 3 } });
    findCategories();
}

// deleteCategory();

//Associations
const findItems = async () => {
    const results = await Item.findAll({ include: Category });
    console.log(JSON.stringify(results));
}

findItems();