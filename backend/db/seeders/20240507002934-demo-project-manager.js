'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoUsers = [
  {
    firstName: "Demo",
    lastName: "Lition",
    username: "Demo-Lition",
    companyName: "Demo LLC",
    email: "@",
    industrySector: "Demolition",
    hashedPassword: bcrypt.hashSync('password')
  },
  {
    firstName: "Jose",
    lastName: "Perez",
    username: "joseperez",
    companyName: "Perez LLC",
    email: "jose@test.io",
    industrySector: "Construction",
    hashedPassword: bcrypt.hashSync('password2')
  }
];

options.tableName = 'ProjectManagers';

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
     await queryInterface.bulkInsert(options, demoUsers)
   } catch (error) {
    console.log(`Error in bulk inserting PMs: `, error)
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
       [Op.or]: demoUsers
      }, {}); 
    } catch (error) {
      console.error('Error in bulk deleting PMs:', error);
    }
  }
};
