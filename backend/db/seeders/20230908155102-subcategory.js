'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Subcategory } = require("../models")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const subCategorySeeds = []

module.exports = {
  async up (queryInterface, Sequelize) {
    await Subcategory.bulkCreate(subCategorySeeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Subcategories';
    return queryInterface.bulkDelete(options)
  }
};
