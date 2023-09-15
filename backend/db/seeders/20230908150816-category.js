'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Category } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const categoryListOld = [
  "Handyman",
  "Moving Services",
  "Furniture Assembly",
  "Mounting & Installation",
  "Cleaning",
  "Shopping & Delivery",
  "Yardwork Services",
  "Holidays",
  "Winter Tasks",
  "Personal Assistant",
  "Baby Prep",
  "Virtual & Online Tasks",
  "Parties & Events",
  "Office Services",
  "Contactless Tasks"
]



const categoryList = [
  {
    category: "Handyman",
    about: "Hire a Tasker for help around the house",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/handyman.webp"
  },
  {
    category: "Moving Services",
    about: "From the heavy lifting to unpacking and organizing make your move with Taskwombat!",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/moving.webp"
  },
  {
    category: "Furniture Assembly",
    about: "Furniture Assembly",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/Furniture.webp"
  },
  {
    category: "Mounting & Installation",
    about: "Wall Mounting",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/mounting.webp"
  },
  {
    category: "Cleaning",
    about: "Taskers will make your home sparkle!",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/cleaning.webp"
  },
  {
    category: "Shopping & Delivery",
    about: "Get anything from groceries to furniture",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/shopping.webp"
  },
  {
    category: "Yardwork Services",
    about: "Hire a Tasker to help with yardwork & landscaping!",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/yard.webp"
  },
  {
    category: "Holidays",
    about: "Holiday Help",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/holiday.jpg"
  },
  {
    category: "Winter Tasks",
    about: "Get help with winter tasks",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/winter.webp"
  },
  {
    category: "Personal Assistant",
    about: "Hire a Tasker to be your personal assistant! Get help on an hourly or ongoing basis.",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/assistant.webp"
  },
  {
    category: "Baby Prep",
    about: "Set up the nursery, childproof your home, and more.",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/baby.jpg"
  },
  {
    category: "Virtual & Online Tasks",
    about: "Virtual assistance, organization, research, & more",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/virtual.webp"
  },
  {
    category: "Parties & Events",
    about: "We'll help make your party great",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/party.webp"
  },
  {
    category: "Office Services",
    about: "Hire a Tasker to help around the office!",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/office.webp"
  },
  {
    category: "Contactless Tasks",
    about: "No-contact delivery, shopping, errands",
    url: "https://taskwombat.s3.us-west-2.amazonaws.com/categories/contactless.webp"
  }
]

module.exports = {
  async up (queryInterface, Sequelize) {
    const categorySeeds = []

    categoryList.forEach(el => {
      categorySeeds.push(el)
    })

    await Category.bulkCreate(categorySeeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Categories';
    return queryInterface.bulkDelete(options)
  }
};
