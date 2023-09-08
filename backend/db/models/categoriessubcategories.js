'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CategoriesSubcategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CategoriesSubcategories.init({
    categoryId: {
      type:  DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onDelete: "cascade"
    },
    subcategoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Subcategories',
        key: 'id'
      },
      onDelete: "cascade"
    }
  }, {
    sequelize,
    modelName: 'CategoriesSubcategories',
  });
  return CategoriesSubcategories;
};
