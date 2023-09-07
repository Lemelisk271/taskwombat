'use strict';

/** @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const userSeeds = [
  {
    email: 'demo@user.io',
    firstName: 'Demo',
    lastName: 'User',
    zipCode: 98051,
    url: "https://images.dog.ceo/breeds/hound-blood/n02088466_8842.jpg",
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    email: 'user1@user.io',
    firstName: 'User',
    lastName: 'One',
    zipCode: 98051,
    url: "https://images.dog.ceo/breeds/hound-blood/n02088466_8842.jpg",
    hashedPassword: bcrypt.hashSync('password2')
  },
  {
    email: 'user2@user.io',
    firstName: "User",
    lastName: 'Two',
    zipCode: 98051,
    url: "https://images.dog.ceo/breeds/hound-blood/n02088466_8842.jpg",
    hashedPassword: bcrypt.hashSync('password3')
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate(userSeeds, {validate: true});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['demo@user.io', 'user1@user.io', 'user2@user.io'] }
    }, {});
  }
};
