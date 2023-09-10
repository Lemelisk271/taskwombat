'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Payment, User } = require('../models');
const { fakerEN_US: faker } = require('@faker-js/faker')
const { randomBetweenNumbers } = require('../../utils/helperFunctions')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const cards = [
      'visa',
      'mastercard',
      'discover',
      'american_express'
    ]

    const generateCard = (user) => {
      const randomCard = randomBetweenNumbers(0, cards.length - 1)
      const cardType = cards[randomCard]

      const cardNumber = faker.finance.creditCardNumber({ issuer: cardType})

      const cvv = faker.finance.creditCardCVV()

      let expMonth = randomBetweenNumbers(1, 12)
      if (expMonth < 10) {
        expMonth = "0" + expMonth
      }
      let expYear = randomBetweenNumbers(2024, 2030)

      const expires = `${expMonth}/${expYear}`

      const payObj = {
        cardNumber,
        cardType,
        cvv,
        expires,
        userId: user.id
      }

      return payObj
    }

    const users = await User.findAll()

    for (let user of users) {
      let num = randomBetweenNumbers(1, 2)
      for (let i = 0; i < num; i++) {
        seeds.push(generateCard(user))
      }
    }

    await Payment.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Payments';
    return queryInterface.bulkDelete(options)
  }
};
