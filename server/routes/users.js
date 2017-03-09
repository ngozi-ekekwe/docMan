import express from 'express';
import userController from '../controllers/UserController';
import authentication from '../middlewares/Authentication';

const router = express.Router();

router.route('/')
  .get(authentication.verifyToken, authentication.validateAdmin, userController
    .index)
  .post(userController.create);

router.route('/login')
  .post(userController.login);

router.route('/logout')
  .post(userController.logout);


router.route('/:id')
  .get(authentication.verifyToken, userController.retrieve)
  .put(authentication.verifyToken, userController.update)
  .delete(authentication.verifyToken, userController.deleteUser);

module.exports = router;
