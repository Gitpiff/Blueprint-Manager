'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProjectManager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ProjectManager.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 30],
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
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
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30],
      }
    },
    industrySector: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    }
  }, {
    sequelize,
    modelName: 'ProjectManager',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    }
  });
  return ProjectManager;
};