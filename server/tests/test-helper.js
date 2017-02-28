const faker = require('faker');

module.exports = {
    role: {
        title: 'author'
    },

    adminRole: {
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
        password: faker.internet.password(),
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

    publicDocument: {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'public'
    },

    privateDocument: {
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        access: 'private'
    }


}