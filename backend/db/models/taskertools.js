'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TaskerTools extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TaskerTools.init({
    taskerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Taskers',
        key: 'id'
      },
      onDelete: 'cascade'
    },
    toolId: {
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
    modelName: 'TaskerTools',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return TaskerTools;
};
