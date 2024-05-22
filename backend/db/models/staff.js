'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Staff.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: "First Name must have between 2 and 30 characters"
        },
        notEmpty: { 
          msg: "First Name is required" 
        },
        notNull: {
          msg: "First Name is required"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 30],
          msg: "Last Name must have between 2 and 30 characters"
        },
        notEmpty: { 
          msg: "Last Name is required" 
        },
        notNull: {
          msg: "Last Name is required"
        }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: { 
        msg: "Picture is required" 
      },
      notNull: {
        msg: "Picture is required"
      }
    },
    hireDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Hire Date is required" },
        isInFuture(value) {
          if(new Date (value) > this.createdAt) {
            throw new Error("Hire Date cannot be in the future")
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: { 
        msg: "Role is required" 
      },
      notNull: {
        msg: "Role is required"
      }
    },
    salary: {
      type: DataTypes.INTEGER,
      allowNull: false,
      notEmpty: { 
        msg: "Salary is required" 
      },
      notNull: {
        msg: "Salary is required"
      }
    },
  }, {
    sequelize,
    modelName: 'Staff',
  });
  return Staff;
};