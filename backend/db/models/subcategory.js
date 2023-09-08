'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subcategory.belongsToMany(models.Category, {
        through: models.CategoriesSubcategories,
        foreignKey: "subcategoryId",
        otherKey: "categoryId"
      })
    }
  }
  Subcategory.init({
    subcategory: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      },
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Subcategory',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Subcategory;
};
