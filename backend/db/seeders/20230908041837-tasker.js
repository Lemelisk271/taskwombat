'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Tasker } = require('../models')
const { fakerEN_US: faker } = require('@faker-js/faker')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const taskerSeeds = []

const createRandomTasker = () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ firstName, lastName})

  return {
    email,
    firstName,
    lastName,
    about: faker.lorem.paragraph({ min: 2, max: 5}),
    zipCode: faker.location.zipCode({ state: "WA" }),
    profileImage: faker.image.avatar(),
    phone: faker.phone.number('##########')
  }
}

for (let i = 0; i < 50; i++) {
  let tasker = createRandomTasker()
  taskerSeeds.push(tasker)
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Tasker.bulkCreate(taskerSeeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Taskers';
    return queryInterface.bulkDelete(options)
  }
};
