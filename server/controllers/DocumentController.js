import { Document } from '../models';
import DocumentUtils from '../ControllerUtils/DocumentUtils';

const DocumentController = {
  /**
   * create - create a new Document
   * @param {Object} req Request object
   * @param {Object} res Response object
   * @returns {Object} res Response object
   */
  create(req, res) {
    DocumentUtils.validate(req).then(() => {
      Document.create(req.body)
        .then(document => res.status(200).send({
          message: 'Document successfully created',
          document: DocumentUtils.formatDocumentList(document)
        })).catch((err) => {
          res.status(err.status).send({ message: err.message });
        });
    }).catch((err) => {
      res.status(err.status).send({ message: err.message });
    });
  },

  /**
   * index - List all Documents
   * @param {Object} req -Request object
   * @param {Object} res - Response Object
   * @returns {Object} res -Response Object
   */
  index(req, res) {
    const query = {};
    query.order = [
      ['createdAt', 'DESC']
    ];
    if (Number(req.query.limit) >= 0) query.limit = req.query.limit;
    if (Number(req.query.offset >= 0)) query.offset = req.query.offset;
    Document.findAndCountAll().then((documents) => {
      const totalCount = documents;
      Document.findAll(query)
        .then((doc) => {
          const pageCount = (totalCount + 1) / 10;
          return res.status(200).send({
            doc,
            pagination: DocumentUtils.indexPagination(req,
              pageCount, totalCount, query)
          });
        });
    });
  },

  /**
   * retrieve - return a particular document
   * @param {Object} req - Request Object
   * @param {Object} res - Response Object
   * @returns {Object} res - Response Object
   */
  retrieve(req, res) {
    DocumentUtils.ifDocumentExists(req, true).then(foundDocument => res.status(
      200).send(
      DocumentUtils.formatDocumentList(foundDocument)
    )).catch(err => res.status(err.status).send({ message: err.message }));
  },

  /**
   * deletes - delete a particular document
   * @param {Object} req -Request Object
   * @param {Object} res -Response Object
   * @returns {Object} res -Response Object
   */
  delete(req, res) {
    DocumentUtils.manageDocument(req).then((foundDocument) => {
      foundDocument.destroy()
        .then(() => res.status(200).send({
          message: 'Document successfully deleted'
        }));
    }).catch((err) => {
      res.status(err.status).send({ message: err.message });
    });
  },

  /**
   * update -  a particular document
   * @param {Object} req -Request Object
   * @param {Object} res -Response Object
   * @returns {Object} res -Response Object
   */
  update(req, res) {
    DocumentUtils.updateDocument(req).then((foundDocument) => {
      foundDocument.update(req.body)
        .then(() => res.status(200).send({
          message: 'Document successfully Updated'
        })).catch((err) => {
          res.status(err.status).send({ message: err.message });
        });
    }).catch((err) => {
      res.status(err.status).send({ message: err.message });
    });
  },

  listMyDocuments(req, res) {
    Document.findAll({
        where: {
          ownerId: req.decoded.UserId
        }
      })
      .then(docs => res.status(200).send(docs));
  },

  search(req, res) {
    const query = {
      where: {
        $and: [{
          $or: [{
            access: 'public'
          }, {
            ownerId: req.decodec.UserId,
          }],
        }],
      },
      order: [
        ['createdAt', 'DESC'],
      ]
    };
    if (req.query.limit >= 0) query.limit = req.query.limit;
    if (req.query.offset >= 0) query.offset = (req.query.offset - 1) * 10;
    if (req.query.term) {
      query.where.$and.push({
        $or: [{
          title: {
            $iLike: `%${req.query.term}%`,
          },
        }, {
          content: {
            $iLike: `%${req.query.term}%`
          },
        }],
      });
    }
    Document.findAndCountAll().then((documents) => {
      const totalCount = documents;
      Document.findAll(query)
        .then((doc) => {
          const pageCount = (totalCount + 1) / 10;
          return res.status(200).send({
            doc,
            pagination: DocumentUtils.indexPagination(req,
              pageCount, totalCount, query)
          });
        });
    });
  },
};


export default DocumentController;
