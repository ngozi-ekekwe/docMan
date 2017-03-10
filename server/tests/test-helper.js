const faker = require('faker');

module.exports = {
  role: {
    title: 'author'
  },

  adminRole: {
    title: 'admin'
  },


  documentRole: {
    title: 'admin'
  },

  regularRole: {
    title: 'regular'
  },

  regularUser: {
    firstname: 'Ngozi',
    lastname: 'Ekekwe',
    username: 'Ngee',
    email: 'ngozi.ekekwe@yahoo.com',
    password: 'hello',
  },

  secondUser: {
    firstname: 'Shalom',
    lastname: 'Ayidu',
    username: 'sayidu',
    email: 'sayidu@yahoo.com',
    password: faker.internet.password(),
  },

  adminUser: {
    firstname: 'Tobi',
    lastname: 'Adeniji',
    username: 'teebee',
    email: 'tadeniji@yahoo.com',
    password: faker.internet.password(),
  },

  documentUser: {
    firstname: 'Rose',
    lastname: 'Mary',
    username: 'rosebae',
    email: 'rosebae@yahoo.com',
    password: faker.internet.password(),
  },

  publicDocument: {
    title: 'hello world',
    content: 'hello world, I love to program ',
    access: 'public'
  },

  privateDocument: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
    access: 'private'
  }


};
