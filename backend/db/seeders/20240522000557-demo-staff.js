'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoEmployees = [
  {
    firstName: 'Oscar',
    lastname: 'Robles',
    picture: 'https://images.pexels.com/photos/73833/weld-hot-soldering-radio-welder-73833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hireDate: new Date('2024-05-01'),
    role: 'Welder',
    salary: 95000
  },
  {
    firstName: 'John',
    lastname: 'Doe',
    picture: 'https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hireDate: new Date('2024-05-01'),
    role: 'Concret Pump Operator',
    salary: 95000
  },
  {
    firstName: 'Sydney',
    lastname: 'Barnes',
    picture: 'https://images.pexels.com/photos/4491475/pexels-photo-4491475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hireDate: new Date('2024-05-01'),
    role: 'Interior Designer',
    salary: 95000
  },
  {
    firstName: 'Shir',
    lastname: 'Tabesh',
    picture: 'https://images.pexels.com/photos/1388944/floor-flooring-hand-man-1388944.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    hireDate: new Date('2024-05-01'),
    role: 'Carpenter',
    salary: 95000
  }
]

options.tableName = 'Staffs'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      await queryInterface.bulkInsert(options, demoEmployees)
    } catch (error) {
     console.log(`Error in bulk inserting Employees: `, error)
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    try {
      const Op = Sequelize.Op;
      await queryInterface.bulkDelete(options, {
       [Op.or]: demoEmployees
      }, {}); 
    } catch (error) {
      console.error('Error in bulk deleting Employees:', error);
    }
  }
};
