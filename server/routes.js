import  DocumentController from '../server/controllers/documents';
import  RoleController from '../server/controllers/roles';
import UserController from '../server/controllers/users';
import Authentication  from '../server/middlewares/auth';

module.exports = (app) => {
    const router = require('express').Router();
    app.use('/', router);

    //role Routes
    router.post('/roles', Authentication.verifyToken, Authentication.validateAdmin, RoleController.create);
    router.get('/roles', Authentication.verifyToken, Authentication.validateAdmin, RoleController.fetchRole);
    router.delete('/roles/:id',Authentication.verifyToken, Authentication.validateAdmin, RoleController.deleteRole);

    //User Routes
    router.post('/users', UserController.create);
    router.get('/users/:id',Authentication.verifyToken, Authentication.validateAdmin, UserController.retrieve);
    router.get('/users', Authentication.verifyToken,Authentication.validateAdmin, UserController.index);
    router.put('/users/:id',Authentication.verifyToken, Authentication.validateAdmin, UserController.update);
    router.delete('/users/:id',Authentication.verifyToken, Authentication.validateAdmin, UserController.delete);

    router.post('/users/login', UserController.login);
    router.post('/users/logout',UserController.logout);


    //document routes
    router.post('/documents', Authentication.verifyToken, Authentication.validateAdmin, DocumentController.create);
    router.get('/documents/:id', Authentication.verifyToken, Authentication.validateAdmin, DocumentController.retrieve);
    router.get('/documents',Authentication.verifyToken, Authentication.validateAdmin, DocumentController.index);
    router.put('/documents/:id', Authentication.verifyToken, Authentication.validateAdmin, DocumentController.update);
    router.delete('/documents/:id', Authentication.verifyToken,Authentication.validateAdmin, DocumentController.destroy);
}
