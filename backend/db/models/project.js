'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.ProjectManager, {
        foreignKey: 'projectManagerId'
      })
    }
  }
  Project.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: { 
          args: [4, 50], 
          msg: "Project Name must be less than 50 characters" 
        },
        notEmpty: { 
          msg: "Project Name is required" 
        },
        notNull: {
          msg: "Project Name is required"
        }
      }
    },
    clientName: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: { 
        msg: "Client Name is required" 
      },
      notNull: {
        msg: "Client Name is required"
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: { 
          args: [30, 2000], 
          msg: "Project Description must have between 30 and 2000 characters" 
        },
        notEmpty: { 
          msg: "Project Description is required" 
        },
        notNull: {
          msg: "Project Description is required"
        }
      }
    },
    coverImage: {
      type: DataTypes.STRING,
      allowNull: false
    },
    budget: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { 
          msg: "Budget is required" 
        },
        notNull: {
          msg: "Budget is required"
        },
        min: {
          args: [501],
          msg: "Budget must be greater than 500"
        }
      }
    },
    projectManagerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    commencementDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Start Date is required" },
        isInPast(value) {
          if(new Date (value) <= this.createdAt) {
            throw new Error("Start Date cannot be in the past")
          }
        }
      }
    },
    completionDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: "Completion Date cannot be on or before Start Date" },
        isAfter(value) {
          if(new Date (value) <= this.commencementDate) {
            throw new Error("Completion Date cannot be on or before Start Date")
          }
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Project',
  });
  return Project;
};