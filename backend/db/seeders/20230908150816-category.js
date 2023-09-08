'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Category } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const categoryList = [
  "Handyman",
  "Moving Services",
  "Furniture Assembly",
  "Mounting & Installation",
  "Cleaning",
  "Shopping & Delivery",
  "Yardwork Services",
  "Holidays",
  "Winter Tasks",
  "Personal Assistant",
  "Baby Prep",
  "Virtual & Online Tasks",
  "Parties & Events",
  "Office Services",
  "Contactless Tasks"
]

const categorySeeds = []

categoryList.forEach(el => {
  const cat = {
    category: el
  }
  categorySeeds.push(cat)
})


module.exports = {
  async up (queryInterface, Sequelize) {
    await Category.bulkCreate(categorySeeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Categories';
    return queryInterface.bulkDelete(options)
  }
};
