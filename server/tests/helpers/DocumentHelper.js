import faker from 'faker';

module.exports = {
  goodDocument: {
    title: 'Ngozi',
    content: 'hello world',
    access: 'public',
  },

  goodDocument2: {
    title: 'NgoziRose',
    content: 'Hello Africa',
    access: 'public',
    ownerId: 1
  },

  badDocument: {
    content: 'hello',
    access: 'public'
  },

  existingDocument: {
    title: 'Ngozi',
    content: 'hello world',
    access: 'private',
    ownerId: 1
  },

  documentOwner: {
    firstname: 'Ngozi',
    lastname: 'Rose',
    username: 'ngee',
    email: 'ng@ng.com',
    password: 'password',
  },

  privateDocument: {
    title: 'Private doc',
    content: 'I am a private doc',
    access: 'private',
  },

  documentAdmin: {
    title: 'admin'
  },

  documentRegular: {
    title: 'regular'
  },

  privateUser: {
    firstname: 'Rose',
    lastname: 'ekekwe',
    username: 'therealng',
    password: 'hello',
    email: 'ngmodel@.com'
  },

  updateDocument: {
    title: 'update'
  },
  document1: {
    title: faker.name.jobTitle(),
    content: faker.name.jobTitle(),
    access: 'public',
    ownerId: 1,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  },
  document2: {
    title: faker.name.jobTitle(),
    content: faker.name.jobTitle(),
    ownerId: 2,
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  },
  document3: {
    id: 38,
    title: 'History',
    content: 'The history is made!!.',
    access: 'private',
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    ownerId: 1
  },
  document4: {
    id: 40,
    title: faker.name.jobTitle(),
    content: faker.name.jobTitle(),
    access: 'public',
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    ownerId: 2
  },
};
