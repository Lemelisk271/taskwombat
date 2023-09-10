'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Review.belongsTo(models.Tasker, {
        foreignKey: 'taskerId'
      })
      Review.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      })
      Review.hasMany(models.ReviewImages, {
        foreignKey: 'reviewId'
      })
    }
  }
  Review.init({
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    taskerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Taskers',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onDelete: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Review',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Review;
};
