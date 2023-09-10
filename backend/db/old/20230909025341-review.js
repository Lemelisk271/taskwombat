'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review, User, Tasker, Category } = require('../models')
const { fakerEN_US: faker } = require('@faker-js/faker')
const { randomBetweenNumbers } = require('../../utils/helperFunctions')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const users = await User.findAll()
    const taskers = await Tasker.findAll({
      include: [
        {
          model: Category,
          through: {
            attributes: []
          }
        }
      ]
    })

    for (let user of users) {
      const shuffleTaskers = taskers.sort(() => 0.5 - Math.random())
      const selectedTaskers = shuffleTaskers.slice(0, 10)
      for (let select of selectedTaskers) {
        seeds.push({
          review: faker.hacker.phrase(),
          stars: randomBetweenNumbers(1, 5),
          date: faker.date.between({from: '2022-09-08T00:00:00.000Z', to: '2024-03-08T00:00:00.000Z'}),
          userId: user.id,
          taskerId: select.id,
          categoryId: select.Categories[randomBetweenNumbers(0, (select.Categories.length - 1))].id
        })
      }
    }

    await Review.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options)
  }
};
