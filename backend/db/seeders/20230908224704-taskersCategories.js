'use strict';

/** @type {import('sequelize-cli').Migration} */

const { TaskerCategories, Category, Tasker } = require('../models')
const { fakerEN_US: faker } = require('@faker-js/faker')

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
          rate: faker.number.float({ min: 30, max: 99, precision: 0.01}),
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
