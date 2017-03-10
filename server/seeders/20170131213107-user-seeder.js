module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [
      {
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

  down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
