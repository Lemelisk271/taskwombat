'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ReviewImages, Review } = require('../models')
const { fakerEN_US: faker } = require('@faker-js/faker')
const { randomBetweenNumbers } = require('../../utils/helperFunctions')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const reviews = await Review.findAll()

    for (let review of reviews) {
      const num = randomBetweenNumbers(2, 5)
      for (let i = 0; i < num; i++) {
        seeds.push({
          url: faker.image.url(),
          reviewId: review.id,
          userId: review.userId
        })
      }
    }

    await ReviewImages.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkDelete(options)
  }
};
