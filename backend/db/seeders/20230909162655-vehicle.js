'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Vehicle } = require('../models');
const { fakerEN_US: faker } = require('@faker-js/faker')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const types = new Set()

    for (let i = 0; i < 20; i++) {
      types.add(faker.vehicle.type())
    }

    types.forEach(type => {
      seeds.push({
        vehicleType: type
      })
    })

    await Vehicle.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Vehicles';
    return queryInterface.bulkDelete(options)
  }
};
