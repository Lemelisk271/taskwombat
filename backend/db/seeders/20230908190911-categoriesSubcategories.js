'use strict';

/** @type {import('sequelize-cli').Migration} */

const { CategoriesSubcategories, Category, Subcategory } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const seeds = []

    const categories = await Category.findAll()
    const subCategories = await Subcategory.findAll()

    const catObj = {}

    for (let category of categories) {
      if (catObj[category.category] === undefined) {
        catObj[category.category] = category.id
      }
    }

    const subObj = {}

    for (let subCategory of subCategories) {
      if (subObj[subCategory.subcategory] === undefined) {
        subObj[subCategory.subcategory] = subCategory.id
      }
    }

    const catSeedObj = {}

    catSeedObj["Handyman"] = [
      "Home Repair",
      "Furniture Assembly",
      "TV Mounting",
      "Ceiling Fan Installation",
      "Smart Home Installation",
      "Heavy Lifting",
      "Install Air Conditioner",
      "Painting",
      "Plumbing",
      "Shelf Mounting",
      "Home Maintenance",
      "Hanging Curtains & Installing Blinds",
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
      "Home Theater Installing"
    ]

    catSeedObj["Moving Services"] = [
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
      "In-Home Furniture Movers"
    ]

    catSeedObj["Furniture Assembly"] = [
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
    ]

    catSeedObj["Mounting & Installation"] = [
      "TV Mounting",
      "Shelf Mounting",
      "Ceiling Fan Installation",
      "Hanging Curtains & Installing Blinds",
      "Hang Pictures",
      "General Mounting",
      "Hang Christmas Lights"
    ]

    catSeedObj["Cleaning"] = [
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
      "Spring Cleaning"
    ]

    catSeedObj["Shopping & Delivery"] = [
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
      "Coffee Delivery"
    ]

    catSeedObj["Yardwork Services"] = [
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
    ]

    catSeedObj["Holidays"] = [
      "Gift Wrapping Services",
      "Hang Christmas Lights",
      "Christmas Tree Delivery",
      "Holiday Decorating",
      "Party Cleaner",
      "Holiday Tree Decorators",
      "Toy Assembly Service",
      "Wait in Line",
      "Christmas Tree Removal"
    ]

    catSeedObj["Winter Tasks"] = [
      "Snow Removal",
      "Sidewalk Salting",
      "Window Winterization",
      "Residential Snow Removal",
      "Christmas Tree Removal",
      "AC Winterization",
      "Winter Yardwork",
      "Pipe Insulation",
      "Storm Door Installation",
      "Winter Deck Maintenance",
      "Water Heater Maintenance",
      "Wait in Line"
    ]

    const keys = Object.keys(catSeedObj)

    for (let key of keys) {
      catSeedObj[key].forEach(el => {
        seeds.push({
          categoryId: catObj[key],
          subcategoryId: subObj[el]
        })
      })
    }

    await CategoriesSubcategories.bulkCreate(seeds, {validate: true})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'CategoriesSubcategories';
    return queryInterface.bulkDelete(options)
  }
};
