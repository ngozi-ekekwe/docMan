import  DocumentController from '../server/controllers/DocumentController';
import  RoleController from '../server/controllers/RoleController';
import UserController from '../server/controllers/UserController';
import Authentication  from '../server/middlewares/Authentication';

let roleController = new RoleController();
let userController = new UserController();
let documentController = new DocumentController();
let authentication = new Authentication();


module.exports = (app) => {
    const router = require('express').Router();
    app.use('/', router);

    // //role Routes
    router.post('/roles', authentication.verifyToken, authentication.validateAdmin, roleController.create);
    router.get('/roles', authentication.verifyToken, authentication.validateAdmin, roleController.fetchRole);
    router.put('/roles/:id',authentication.verifyToken, authentication.validateAdmin, roleController.updateRole);
    router.delete('/roles/:id',authentication.verifyToken, authentication.validateAdmin, roleController.deleteRole);

    //User Routes
    router.post('/users', userController.create);
    router.get('/users/:id',authentication.verifyToken, userController.retrieve);
    router.get('/users', authentication.verifyToken, authentication.validateAdmin, userController.index);
    router.put('/users/:id',authentication.verifyToken, userController.update);
    router.delete('/users/:id',authentication.verifyToken, userController.delete);
    router.post('/users/login', userController.login);
    router.post('/users/logout',userController.logout);


    //document routes
    router.post('/documents', authentication.verifyToken, documentController.create);
    router.get('/documents/:id', authentication.verifyToken, documentController.retrieve);
    router.get('/documents', documentController.index);
    router.put('/documents/:id', authentication.verifyToken, documentController.update);
    router.delete('/documents/:id', authentication.verifyToken, documentController.delete);
}
