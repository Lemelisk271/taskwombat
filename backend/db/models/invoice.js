'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoice.belongsTo(models.Appointment, {
        foreignKey: 'appointmentId'
      })
      Invoice.belongsTo(models.Tasker, {
        foreignKey: 'taskerId'
      })
      Invoice.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Invoice.init({
    rate: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
      validate: {
        max: 99
      }
    },
    fees: {
      type: DataTypes.FLOAT(4, 2),
      allowNull: false,
      validate: {
        max: 99
      }
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    amountPaid: {
      type: DataTypes.FLOAT(6, 2),
      allowNull: false,
      validate: {
        max: 9999
      },
      defaultValue: 0
    },
    fullPaid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    appointmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Appointments',
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onDelete: 'cascade'
    }
  }, {
    sequelize,
    modelName: 'Invoice',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Invoice;
};
