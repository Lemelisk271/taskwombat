'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Review, Appointment } = require('../models')
const { fakerEN_US: faker } = require('@faker-js/faker')
const { randomBetweenNumbers } = require('../../utils/helperFunctions')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const appointments = await Appointment.findAll()

    for (let appointment of appointments) {
      const apptDate = Date.parse(appointment.start)
      const dateNow = Date.now()
      const dateDiff = dateNow - apptDate
      console.log(dateDiff)

      if (dateDiff > 0) {
        let review = faker.hacker.phrase()
        let stars = randomBetweenNumbers(1, 5)

        const today = new Date()
        const date = faker.date.between({from: appointment.start, to: today})

        const reviewObj = {
          review,
          stars,
          date,
          appointmentId: appointment.id,
          userId: appointment.userId,
          taskerId: appointment.taskerId,
          categoryId: appointment.categoryId
        }

        seeds.push(reviewObj)
      }
    }
    console.log("Seeds: ", seeds.length)
    console.log("Appointments: ", appointments.length)
    Review.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    return queryInterface.bulkDelete(options)
  }
};
