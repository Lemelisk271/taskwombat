'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Subcategory, {
        through: models.CategoriesSubcategories,
        foreignKey: "categoryId",
        otherKey: "subcategoryId"
      }),
      Category.belongsToMany(models.Tasker, {
        through: models.TaskerCategories,
        foreignKey: "categoryId",
        otherKey: "taskerId"
      })
      Category.hasMany(models.Review, {
        foreignKey: 'categoryId'
      })
      Category.hasMany(models.Appointment, {
        foreignKey: 'categoryId'
      })
    }
  }
  Category.init({
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Category;
};
