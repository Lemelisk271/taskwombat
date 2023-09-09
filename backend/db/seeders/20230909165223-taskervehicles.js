'use strict';

/** @type {import('sequelize-cli').Migration} */

const { TaskerVehicles, Tasker, Vehicle } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}


module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const taskers = await Tasker.findAll()
    const vehicles = await Vehicle.findAll()

    for (let tasker of taskers) {
      const shuffleVehicles =  vehicles.sort(() => 0.5 - Math.random())
      const selectedVehicles = shuffleVehicles.slice(0, 2)
      for (let vehicle of selectedVehicles) {
        seeds.push({
          taskerId: tasker.id,
          vehicleId: vehicle.id
        })
      }
    }

    TaskerVehicles.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'TaskerVehicles';
    return queryInterface.bulkDelete(options)
  }
};
