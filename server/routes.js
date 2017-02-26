const documentController = require('../server/controllers/documents');
const roleController = require('../server/controllers/roles');
const userController = require('../server/controllers/users');
const Auth = require('../server/middlewares/auth');

module.exports = (app) => {
    const router = require('express').Router();
    app.use('/', router);
    
    //role Routes
    router.post('/roles', Auth.verifyToken, Auth.validateAdmin, roleController.create);
    router.get('/roles/:id',Auth.verifyToken, Auth.validateAdmin, roleController.retrieve);
    router.get('/roles', Auth.verifyToken, Auth.validateAdmin, roleController.index);
    router.put('/roles/:id',Auth.verifyToken, Auth.validateAdmin, roleController.update);
    router.delete('/roles/:id',Auth.verifyToken, Auth.validateAdmin, roleController.destroy);

    //User Routes
    router.post('/users', userController.create);
    router.get('/users/:id',Auth.verifyToken, Auth.validateAdmin, userController.retrieve);
    router.get('/users', Auth.verifyToken,Auth.validateAdmin, userController.index);
    router.put('/users/:id',Auth.verifyToken, Auth.validateAdmin, userController.update);
    router.delete('/users/:id',Auth.verifyToken, Auth.validateAdmin, userController.destroy);

    router.post('/users/login',Auth.verifyToken, Auth.validateAdmin, userController.login);
    router.post('/users/logout',Auth.verifyToken, Auth.validateAdmin,  userController.logout);
   

    //document routes
    router.post('/documents', Auth.verifyToken, Auth.validateAdmin, documentController.create);
    router.get('/documents/:id', Auth.verifyToken, Auth.validateAdmin, documentController.retrieve);
    router.get('/documents',Auth.verifyToken, Auth.validateAdmin, documentController.index);
    router.put('/documents/:id', Auth.verifyToken, Auth.validateAdmin, documentController.update);
    router.delete('/documents/:id', Auth.verifyToken,Auth.validateAdmin, documentController.destroy);
}