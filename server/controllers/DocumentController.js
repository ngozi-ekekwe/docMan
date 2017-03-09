import { Document } from '../models';
import documentUtils from '../ControllerUtils/DocumentUtils';

const documentController = {

  /**
   * create - create a new Document
   * @params {Object} req Request object
   * @params {Object} res Response object
   * @returns {Object} res Response object
   */
  create(req, res) {
    documentUtils.validate(req).then(() => {
      Document.create(req.body)
        .then(document => res.status(200).send({
          message: 'Document successfully created',
          document: documentUtils.formatDocumentList(document)
        })).catch((err) => {
          res.status(err.status).send({ message: err.message });
        });
    }).catch((err) => {
      res.status(err.status).send({ message: err.message });
    });
  },

  /**
   * index - List all Documents
   * @params {Object} request -Request object
   * @Params {Object} response - Response Object
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
            pagination: documentUtils.indexPagination(req,
              pageCount, totalCount, query)
          });
        });
    });
  },

  /**
   * retrieve - return a particular document
   * @params {Object} req - Request Object
   * @params {Object} res - Response Object
   */
  retrieve(req, res) {
    documentUtils.ifDocumentExists(req, true).then(foundDocument => res.status(
      200).send(
      documentUtils.formatDocumentList(foundDocument)
    )).catch(err => res.status(err.status).send({ message: err.message }));
  },

  /**
   * deletes - delete a particular document
   * @params {Object} req -Request Object
   * @params {Object} res -Response Object
   */
  delete(req, res) {
    documentUtils.ifDocumentExists(req).then((foundDocument) => {
      foundDocument.destroy()
        .then(() => res.status(200).send({
          message: 'Document successfully deleted'
        }));
    }).catch((err) => {
      res.status(err.status).send({ message: err.message });
    });
  },

  /** update -  a particular document
   * @params {Object} req -Request Object
   * @params {Object} res -Response Object
   */
  update(req, res) {
    documentUtils.ifDocumentExists(req).then((foundDocument) => {
      foundDocument.update(req.body)
        .then(() => res.status(200).send({
          message: 'Document successfully Updated'
        }));
    }).catch((err) => {
      res.status(err.status).send({ message: err.message });
    });
  },

  search(req, res) {
    const query = {
      where: {
        $and: [{
          $or: [{
            access: 'public',
          }, {
            ownerId: req.decoded.UserId,
          }],
        }],
      },

      order: [
        ['createdAt', 'DESC'],
      ],
    };

    if (req.query.limit >= 0) query.limit = req.query.limit;
    if (req.query.offset >= 0) query.offset = (req.query.offset - 1) * 10;
    if (req.query.searchText) {
      query.where.$and.push({
        $or: [{
          title: {
            $iLike: `%${req.query.searchText}%`
          },
        }, {
          content: {
            $iLike: `%${req.query.searchText}%`

          },
        }],
      });
    }

    Document.findAll(query)
      .then((docs) => {
        res.status(201).send(
          documentUtils.formatDocumentList(docs)
        );
      });
  },

  listMyDocuments(req, res) {
    Document.findAll({
        where: {
          ownerId: +req.params.id
        },
      })
      .then((docs) => {
        res.status(200).send(
          documentUtils.formatDocumentList(docs));
      });
  }
};

export default documentController;
