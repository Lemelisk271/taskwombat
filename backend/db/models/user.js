'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Review, {
        foreignKey: 'userId'
      })
      User.hasMany(models.ReviewImages, {
        foreignKey: 'userId'
      })
      User.hasMany(models.Appointment, {
        foreignKey: 'userId'
      })
      User.hasMany(models.Invoice, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [5, 5]
    },
    profileImage: {
      type: DataTypes.STRING
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      len: [60, 60]
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [10, 10]
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "createdAt", "updatedAt"]
      }
    }
  });
  return User;
};
