'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Appointment, User, Tasker } = require('../models')
const { fakerEN_US: faker } = require('@faker-js/faker')
const { randomBetweenNumbers } = require('../../utils/helperFunctions')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const generateAppointment = (taskerId, userId) => {
  const startDate = new Date(faker.date.between({ from: '2022-09-09T00:00:00.000Z', to: '2024-03-09T00:00:00.000Z'}))
  const year = startDate.getFullYear()
  let date = startDate.getDate()
  if (date < 10) {
    date = '0' + date
  }
  let month = startDate.getMonth() + 1
  if (month < 10) {
    month = '0' + month
  }
  let startHour = randomBetweenNumbers(9, 18)

  const appointmentLength = randomBetweenNumbers(1, 3)

  let endHour = startHour + appointmentLength

  if (startHour < 10) {
    startHour = '0' + startHour
  }

  if (endHour < 10) {
    endHour = '0' + endHour
  }

  const start = new Date(`${year}-${month}-${date}T${startHour}:00:00`)
  const end = new Date(`${year}-${month}-${date}T${endHour}:00:00`)

  return {
    start,
    end,
    task: faker.hacker.phrase(),
    taskerId,
    userId
  }
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const users = await User.findAll()
    const taskers = await Tasker.findAll()

    for (let user of users) {
      const numAppt = randomBetweenNumbers(2, 7)
      const shuffleTaskers = taskers.sort(() => 0.5 - Math.random())
      const selectedTaskers = shuffleTaskers.slice(0, numAppt)
      for (let tasker of selectedTaskers) {
        seeds.push(generateAppointment(tasker.id, user.id))
      }
    }

    Appointment.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Appointments';
    return queryInterface.bulkDelete(options)
  }
};
