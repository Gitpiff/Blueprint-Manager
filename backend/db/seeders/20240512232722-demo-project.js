'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const demoProjects = [
  {
    name: "Green Haven Community Park",
    clientName: "John Smith",
    description: "Green Haven Community Park is a sustainable urban park designed to provide a green oasis in the heart of the city. The project aims to create a multifunctional space for recreation, education, and community events, incorporating eco-friendly technologies and promoting environmental awareness. The park will feature a variety of amenities, including walking and cycling paths, a children's playground, picnic areas, community gardens, an outdoor amphitheater, and a small pond with a boardwalk. Native plants and trees will be used to enhance biodiversity and support local wildlife. The park will also include solar-powered lighting, rainwater harvesting systems, and recycling stations.",
    coverImage: 'https://landezine.com/wp-content/uploads/2021/02/1-Ketcheson-Park-PWL-Partnership-Landscape-Architects-Inc.jpg',
    budget: 1500000,
    projectManagerId: 1,
    commencementDate: new Date('2024-06-07'),
    completionDate: new Date('2024-12-15')
  },
  {
    name: 'Blue Horizon Aquatic Center',
    clientName: "Andres Iniesta",
    description: "Blue Horizon Aquatic Center is a state-of-the-art aquatic facility designed to serve as a hub for water-based recreation, fitness, and education. The center will provide a variety of amenities, including an Olympic-sized swimming pool, a children's splash pad, a therapeutic pool, and a diving well. The facility will also feature eco-friendly technologies such as solar heating for pools, rainwater harvesting, and energy-efficient lighting. Additionally, the center will offer programs for all ages, including swimming lessons, water aerobics, and competitive swim training. The design will emphasize accessibility, ensuring that all community members can enjoy the benefits of aquatic activities.",
    coverImage: 'https://www.londonaquaticscentre.org/wp-content/uploads/2024/02/CSP8052_0.jpg',
    budget: 2000000,
    projectManagerId: 1,
    commencementDate: new Date('2024-06-15'),
    completionDate: new Date('2025-03-20')
  },
  {
    name: 'Harmony Arts and Cultural Center',
    clientName: "Pablo Picasso",
    description: 'Harmony Arts and Cultural Center is a dynamic, multifaceted facility designed to celebrate and nurture the arts and culture within the community. The center will offer a variety of spaces, including a performance theater, art galleries, studios for classes and workshops, and outdoor event areas. The center will also feature eco-friendly technologies, such as solar panels, energy-efficient lighting, and rainwater harvesting systems. Programs will cater to all ages and interests, including art classes, theater productions, music performances, and cultural festivals. The design will emphasize inclusivity and accessibility, ensuring that everyone can participate and enjoy the cultural offerings.',
    coverImage: 'https://darcawards.com/wp-content/uploads/2021/10/Guangming-Culture-Art-CenterBIRDVIEW1.jpg',
    budget: 3000000,
    projectManagerId: 1,
    commencementDate: new Date('2024-08-10'),
    completionDate: new Date('2025-04-01')
  }
]

options.tableName = 'Projects';
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
      await queryInterface.bulkInsert(options, demoProjects)
    } catch (error) {
     console.log(`Error in bulk inserting Projects: `, error)
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
       [Op.or]: demoProjects
      }, {}); 
    } catch (error) {
      console.error('Error in bulk deleting Projects:', error);
    }
  }
};
