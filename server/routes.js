const documentController = require('../server/controllers/documents');
const roleController = require('../server/controllers/roles');
const userController = require('../server/controllers/users');

module.exports = (app) => {
    const router = require('express').Router();
    app.use('/', router);
    
    //role Router
    router.post('/roles', roleController.create);
    router.get('/roles/:id', roleController.retrieve);
    router.get('/roles', roleController.index);
    router.put('/roles/:id', roleController.update);
    router.delete('/roles/:id', roleController.destroy);
   

    //document routes
    router.post('/documents', documentController.create);
    router.get('documents', documentController.index);
}