import express from 'express';
import documentController from '../controllers/DocumentController';
import authentication from '../middlewares/Authentication';

const router = express.Router();

router.route('/')
    .get(authentication.verifyToken, authentication.validateAdmin,documentController.index)
    .post(authentication.verifyToken, documentController.create)
    .get(authentication.verifyToken, documentController.search);

router.route('/:id/documents')
	.get(authentication.verifyToken, documentController.listMyDocuments);

router.route('/:id')
    .get(authentication.verifyToken, documentController.retrieve)
    .put(authentication.verifyToken,  documentController.update)
    .delete(authentication.verifyToken,  documentController.delete);

module.exports = router;