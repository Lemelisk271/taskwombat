'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Availability extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Availability.belongsTo(models.Tasker, {
        foreignKey: 'taskerId'
      })
    }
  }
  Availability.init({
    day: {
      type: DataTypes.ENUM('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'),
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME
    },
    endTime: {
      type: DataTypes.TIME
    },
    notAvailable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    dayIdx: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    taskerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Taskers',
        key: 'id'
      },
      onDelete: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Availability',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Availability;
};
