'use strict';

/** @type {import('sequelize-cli').Migration} */

const { TaskerTools, Tasker, Tool } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const taskers = await Tasker.findAll()
    const tools = await Tool.findAll()

    for (let tasker of taskers) {
      const shuffleTools = tools.sort(() => 0.5 - Math.random())
      const selectedTools = shuffleTools.slice(0, 5)
      for (let tool of selectedTools) {
        seeds.push({
          taskerId: tasker.id,
          toolId: tool.id
        })
      }
    }

    await TaskerTools.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'TaskerTools';
    return queryInterface.bulkDelete(options)
  }
};
