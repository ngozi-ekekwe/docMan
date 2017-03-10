import validateParameters from '../ControllerUtils/Utils';
import { Document } from '../models';

const requiredParameters = [
  'title',
  'content',
  'access'
];

const DocumentUtils = {
  /**
   * Checks request parameters to ensure they are valid
   * @param {Object} request object
   * @param {Object} resolve object
   * @returns {Object} promise
   */
  validate(request) {
    return new Promise((resolve, reject) => {
      if (validateParameters(request, requiredParameters)) {
        Document.findOne({ where: { title: request.body.title } })
          .then((foundDocument) => {
            if (foundDocument) {
              reject({
                message: 'Document with title already exists',
                status: 409
              });
            }
            resolve(request.body.ownerId = request.decoded.UserId);
          });
      } else {
        reject({ message: 'Some Fields are missing', status: 403 });
      }
    });
  },

  /**
   * method returns meteData for pagination
   * @param  {Object} request object
   * @param {Number} pageCount number
   * @param {Number} totalCount number
   * @param {Object} query object
   * @returns {Object} - returns object
   */
  indexPagination(request, pageCount, totalCount, query) {
    return ({
      page: Number(request.query.offset) || 1,
      page_count: Math.floor((totalCount.count + 1) / 10),
      page_size: Number(query.limit) || 10,
      total_count: totalCount.count
    });
  },

  /**
   * ifDocumentExists
   * @param {Object} request object
   * @param {Boolean} resolve object
   * @returns {Object} - returns object
   */
  ifDocumentExists(request) {
    return new Promise((resolve, reject) => {
      Document.findById(request.params.id)
        .then((foundDocument) => {
          if (!foundDocument) {
            return reject({
              message: 'Document Not Found',
              status: 404
            });
          }
          if ((foundDocument.access === 'public') ||
            (foundDocument.access === 'private' &&
              foundDocument.ownerId === request.decoded.UserId)
          ) {
            return resolve(foundDocument);
          }
          if (foundDocument.access === 'private' && foundDocument.owner !==
            request.decoded.UserId) {
            return reject({ message: 'This Document is Private', status: 403 });
          }
        });
    });
  },

  formatDocumentList(document) {
    const docformat = {
      title: document.title,
      content: document.content,
      access: document.access,
      published: document.createdAt
    };
    return docformat;
  },


  manageDocument(req) {
    return new Promise((resolve, reject) => {
      Document.findById(req.params.id)
        .then((foundDocument) => {
          if (!foundDocument) {
            return reject({
              message: 'Document not found',
              status: 404
            });
          }
          if (foundDocument.ownerId === req.decoded.UserId) {
            return resolve(foundDocument);
          }
          return reject({
            message: 'You can only make changes to your document',
            status: 403
          });
        });
    });
  }
};

module.exports = DocumentUtils;
