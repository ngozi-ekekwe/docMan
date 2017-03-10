import express from 'express';
import roleController from '../controllers/RoleController';
import authentication from '../middlewares/Authentication';

const router = express.Router();

router.route('/')
  .get(authentication.verifyToken, authentication.validateAdmin, roleController
    .fetchRoles)
  .post(authentication.verifyToken, authentication.validateAdmin,
    roleController.create);

router.route('/:id')
  .get(authentication.verifyToken, authentication.validateAdmin, roleController
    .retrieve)
  .put(authentication.verifyToken, authentication.validateAdmin, roleController
    .updateRole)
  .delete(authentication.verifyToken, authentication.validateAdmin,
    roleController.deleteRole);

module.exports = router;
