'use strict';

/** @type {import('sequelize-cli').Migration} */

const { Subcategory } = require("../models")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const subCategoryList = new Set([
  "Furniture Assembly",
  "TV Mounting",
  "Home Repair",
  "Help Moving",
  "Ceiling Fan Installation",
  "Smart Home Installation",
  "Heavy Lifting",
  "Install Air Conditioner",
  "Painting",
  "Plumbing",
  "Shelf Mounting",
  "Home Maintenance",
  "Hanging Curtains $ Installing Blinds",
  "Drywall Repair Service",
  "Baby Proofing",
  "Yard Work Services",
  "Light Installation",
  "Electrical Help",
  "Carpentry Services",
  "Hang Pictures",
  "General Mounting",
  "Cabinet Installation",
  "Wallpapering Service",
  "Fence Installation & Repair Services",
  "Deck Restoration Services",
  "Doorbell Installation",
  "Home Theater Installing",
  "Help Moving",
  "Packing Services & Help",
  "Unpacking Services",
  "Heavy Lifting",
  "Local Movers",
  "Junk Pickup",
  "Furniture Movers",
  "One Item Movers",
  "Storage Unit Moving",
  "Couch Removal",
  "Mattress Pick-Up & Removal",
  "Furniture Removal",
  "Pool Table Movers",
  "Appliance Removal",
  "Heavy Furniture Moving",
  "Rearrange Furniture",
  "Full Service Help Moving",
  "In-Home Furniture Movers",
  "Furniture Assembly",
  "Patio Furniture Assembly",
  "Desk Assembly",
  "Dresser Assembly",
  "Bed Assembly",
  "Bookshelf Assembly",
  "Couch Assembly",
  "Chair Assembly",
  "Wardrobe Assembly",
  "Table Assembly",
  "Disassemble Furniture",
  "Hang Christmas Lights",
  "House Cleaning Services",
  "Deep Cleaning",
  "Disinfecting Services",
  "Move In Cleaning",
  "Move Out Cleaning",
  "Vacation Rental Cleaning",
  "Carpet Cleaning Service",
  "Garage Cleaning",
  "One Time Cleaning Services",
  "Car Washing",
  "Laundry Help",
  "Pressure Washing",
  "Spring Cleaning",
  "Delivery Service",
  "Grocery Shopping & Delivery",
  "Running Your Errands",
  "Christmas Tree Delivery",
  "Wait in Line",
  "Deliver Big Piece of Furniture",
  "Drop Off Donations",
  "Contactless Delivery",
  "Pet Food Delivery",
  "Baby Food Delivery",
  "Return Items",
  "Wait for Delivery",
  "Shipping",
  "Breakfast Delivery",
  "Coffee Delivery",
  "Gardening Services",
  "Weed Removal",
  "Lawn Care Services",
  "Lawn Mowing Services",
  "Landscaping Services",
  "Gutter Cleaning",
  "Tree Trimming Service",
  "Vacation Plant Watering",
  "Patio Cleaning",
  "Hot Tub Cleaning",
  "Fence Installation & Repair Services",
  "Deck Restoration Services",
  "Patio Furniture Assembly",
  "Fence Staining",
  "Mulching Services",
  "Lawn Fertilizer Service",
  "Hedge Trimming Service",
  "Outdoor Party Setup",
  "Urban Gardening Service",
  "Leaf Raking & Removal",
  "Produce Gardening",
  "Hose Installation",
  "Shed Maintenance",
  "Pressure Washing"
])

const subCategorySeeds = []

subCategoryList.forEach(el => {
  const subItem = {
    subcategory: el
  }
  subCategorySeeds.push(subItem)
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await Subcategory.bulkCreate(subCategorySeeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Subcategories';
    return queryInterface.bulkDelete(options)
  }
};
