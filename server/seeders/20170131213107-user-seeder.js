'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        firstname: 'Ngozi',
        lastname: 'Ekekwe',
        username: 'Ngee',
        email: 'ng@ng',
        password: 'ngee',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 1
      },
       {
        id: 2,
        firstname: 'Ngozii',
        lastname: 'Ekekwei',
        username: 'Ngeei',
        email: 'ng@ngi',
        password: 'ngeei',
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 2
       }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
