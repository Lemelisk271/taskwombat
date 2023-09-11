'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require("bcryptjs");
const { fakerEN_US: faker } = require('@faker-js/faker')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const userSeeds = [
  {
    email: 'demo@user.io',
    firstName: 'Demo',
    lastName: 'User',
    zipCode: faker.location.zipCode({ state: "WA" }),
    profileImage: faker.image.avatar(),
    hashedPassword: bcrypt.hashSync('password'),
    phone: faker.phone.number('##########')
  }
]

const createRandomUser = () => {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const email = faker.internet.email({ firstName, lastName })

  return {
    email,
    firstName,
    lastName,
    zipCode: faker.location.zipCode({ state: "WA" }),
    profileImage: faker.image.avatar(),
    hashedPassword: bcrypt.hashSync('password'),
    phone: faker.phone.number('##########')
  }
}

for (let i = 0; i < 19; i++) {
  let user = createRandomUser()
  userSeeds.push(user)
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(userSeeds, {validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkDelete(options)
  }
};
