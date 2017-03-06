module.exports = {
    goodDocument: {
        title: 'Ngozi',
        content: 'hello world',
        access: 'public',
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
    }
}