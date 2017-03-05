'use strict';
const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Documents', [
      {
        title: 'hello',
        content: 'hello',
        access: 'private',
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        title: 'hiya',
        content: 'hello',
        access: 'public',
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Documents', null, {})
  }
};
