const documentController = require('../server/controllers/documents');
const roleController = require('../server/controllers/roles');
const userController = require('../server/controllers/users');

module.exports = (app) => {
    const router = require('express').Router();
     app.use('/', router);
     router.post('/roles', roleController.create);
     router.get('/roles', roleController.index);
     
}