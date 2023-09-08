'use strict';

/** @type {import('sequelize-cli').Migration} */

const { TaskerCategories, Category, Tasker } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const taskers = await Tasker.findAll()
    const categories = await Category.findAll()

    for (let tasker of taskers) {
      const shuffledCat = categories.sort(() => 0.5 - Math.random())
      const selected = shuffledCat.slice(0, 3)
      for (let select of selected) {
        seeds.push({
          taskerId: tasker.id,
          categoryId: select.id
        })
      }
    }

    await TaskerCategories.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'TaskerCategories';
    return queryInterface.bulkDelete(options)
  }
};
