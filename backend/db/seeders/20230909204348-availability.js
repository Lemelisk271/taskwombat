'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Availability, Tasker } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const taskers = await Tasker.findAll()

    for (let tasker of taskers) {
      seeds.push({
        day: 'Mon',
        startTime: '09:00:00',
        endTime: '21:00:00',
        notAvailable: false,
        dayIdx: 1,
        taskerId: tasker.id
      })
      seeds.push({
        day: 'Tue',
        startTime: '09:00:00',
        endTime: '21:00:00',
        notAvailable: false,
        dayIdx: 2,
        taskerId: tasker.id
      })
      seeds.push({
        day: 'Wed',
        startTime: '09:00:00',
        endTime: '21:00:00',
        notAvailable: false,
        dayIdx: 3,
        taskerId: tasker.id
      })
      seeds.push({
        day: 'Thu',
        startTime: '09:00:00',
        endTime: '21:00:00',
        notAvailable: false,
        dayIdx: 4,
        taskerId: tasker.id
      })
      seeds.push({
        day: 'Fri',
        startTime: '09:00:00',
        endTime: '21:00:00',
        notAvailable: false,
        dayIdx: 5,
        taskerId: tasker.id
      })
      seeds.push({
        day: 'Sat',
        startTime: '09:00:00',
        endTime: '21:00:00',
        notAvailable: false,
        dayIdx: 6,
        taskerId: tasker.id
      })
      seeds.push({
        day: 'Sun',
        startTime: '09:00:00',
        endTime: '21:00:00',
        notAvailable: false,
        dayIdx: 7,
        taskerId: tasker.id
      })
    }

    await Availability.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Availabilities';
    return queryInterface.bulkDelete(options)
  }
};
