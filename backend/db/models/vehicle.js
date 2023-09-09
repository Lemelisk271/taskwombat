'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vehicle.belongsToMany(models.Tasker, {
        through: models.TaskerVehicles,
        foreignKey: "vehicleId",
        otherKey: "taskerId"
      })
    }
  }
  Vehicle.init({
    vehicleType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    }
  }, {
    sequelize,
    modelName: 'Vehicle',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Vehicle;
};
