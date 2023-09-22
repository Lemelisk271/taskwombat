'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Invoice, Tasker, Appointment, Category } = require('../models')
const { fakerEN_US: faker } = require('@faker-js/faker')
const { randomBetweenNumbers } = require('../../utils/helperFunctions')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const appointments = await Appointment.findAll({
      include: [
        {
          model: Tasker,
          include: [
            {
              model: Category,
              through: {
                attributes: ['rate']
              }
            }
          ]
        },
      ]
    })


    for (let appointment of appointments) {
      let rate = 0
      for (let category of appointment.Tasker.Categories) {
        if (appointment.categoryId === category.id) {
          rate = category.TaskerCategories.rate
        }
      }

      let fees = Math.round((rate * .33) * 100) / 100

      const startHour = new Date(appointment.start).getHours()
      const endHour = new Date(appointment.end).getHours()
      let hours = endHour - startHour

      const totalDue = Math.round(((rate * hours) + fees) * 100) / 100

      const today = new Date().getTime()
      const end = new Date(appointment.end).getTime()

      let amountPaid

      if (end < today) {
        const payChoice = randomBetweenNumbers(1, 3)
        if (payChoice === 1) {
          amountPaid = 0
        }
        if (payChoice === 2) {
          amountPaid = faker.number.float({ min: 0, max: totalDue, precision: 0.01})
        }
        if (payChoice === 3) {
          amountPaid = totalDue
        }
      } else {
        amountPaid = 0
      }

      const fullPaid = totalDue === amountPaid

      const apptObj = {
        rate,
        fees,
        hours,
        totalDue,
        amountPaid,
        fullPaid,
        appointmentId: appointment.id,
        taskerId: appointment.taskerId,
        userId: appointment.userId
      }
      seeds.push(apptObj)
    }

    Invoice.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Invoices';
    return queryInterface.bulkDelete(options)
  }
};
