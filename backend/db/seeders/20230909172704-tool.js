'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Tool } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const tools = [
  "Drill",
  "Pliers",
  "Hammer",
  "Saw",
  "Screwdriver",
  "Circular Saw",
  "Axe",
  "Band Saw",
  "Vise",
  "Shovel",
  "Impact Driver",
  "Chainsaw",
  "Sander",
  "Wrench",
  "Ladder",
  "Nail Gun",
  "Air Compressor",
  "Clamp",
  "Lawn Mower",
  "Mallet"
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    for (let tool of tools) {
      seeds.push({
        toolType: tool
      })
    }

    await Tool.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Tools';
    return queryInterface.bulkDelete(options)
  }
};
