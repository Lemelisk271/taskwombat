'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tasker.belongsToMany(models.Category, {
        through: models.TaskerCategories,
        foreignKey: "taskerId",
        otherKey: "categoryId"
      })
      Tasker.hasMany(models.Review, {
        foreignKey: 'taskerId'
      })
      Tasker.belongsToMany(models.Vehicle, {
        through: models.TaskerVehicles,
        foreignKey: 'taskerId',
        otherKey: 'vehicleId'
      })
      Tasker.belongsToMany(models.Tool, {
        through: models.TaskerTools,
        foreignKey: 'taskerId',
        otherKey: 'toolId'
      })
      Tasker.hasMany(models.Availability, {
        foreignKey: 'taskerId'
      })
    }
  }
  Tasker.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    about: {
      type: DataTypes.TEXT,
      allowNull:false
    },
    zipCode: {
      type: DataTypes.STRING,
      validate: {
        len: [5, 5]
      }
    },
    profileImage: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 255]
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 100]
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [10, 10]
    }
  }, {
    sequelize,
    modelName: 'Tasker',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Tasker;
};
