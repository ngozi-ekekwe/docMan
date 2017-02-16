const documentController = require('../server/controllers/documents');
const roleController = require('../server/controllers/roles');
const userController = require('../server/controllers/users');

module.exports = (app) => {
    const router = require('express').Router();
    app.use('/', router);
    
    //role Routes
    router.post('/roles', roleController.create);
    router.get('/roles/:id', roleController.retrieve);
    router.get('/roles', roleController.index);
    router.put('/roles/:id', roleController.update);
    router.delete('/roles/:id', roleController.destroy);

    //User Routes
    router.post('/users', userController.create);
    router.get('/users/:id', userController.retrieve);
    router.get('/users', userController.index);
    router.put('/users/:id', userController.update);
    router.delete('/users/:id', userController.destroy);
   

    //document routes
    router.post('/documents', documentController.create);
    router.get('/documents/:id', documentController.retrieve);
    router.get('/documents', documentController.index);
    router.put('/documents/:id', documentController.update);
    router.delete('/documents/:id', documentController.destroy);
}