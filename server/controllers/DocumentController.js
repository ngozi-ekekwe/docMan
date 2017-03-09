import  { Document , User, Role } from '../models';
import documentUtils from '../ControllerUtils/DocumentUtils';

const documentController = {

/**
   * creates a new Document
   * @params {Object} Request object
   * @params {Object} Response object
   * @returns {Object} Response object
   */
   create(req, res) {
     documentUtils.validate(req).then((document) => {
        Document.create(req.body)
          .then((document) => {
            return res.status(200).send({
              message: 'Document successfully created',
              document: documentUtils.formatDocumentList(document)
            })
          }).catch(err => {
            res.status(err.status).send({message: err.message})
          });   
     }).catch(err => {
       res.status(err.status).send({message: err.message})
     })
   },

  /**
   * Lists all Documents
   * @params {Object} request -Request object
   * @Params {Object} response - Response Object
   */
   index(req,res) {
    let query = {}
    query.order = [
      ['createdAt', 'DESC']
    ];
    if(Number(req.query.limit) >= 0) query.limit = req.query.limit;
    if(Number(req.query.offset >=0)) query.offset = req.query.offset;
    Document.findAndCountAll().then((documents) => {
      let total_count;
      total_count = documents;
      Document.findAll(query)
        .then((documents) => {
          const page_count = (total_count +1) / 10;
            return res.status(200).send({
              documents,
              pagination: documentUtils.indexPagination(req, page_count,total_count, query)
            });
        });
    });
  },

  /**
   * returns a particular document
   * @params {Object} request - Request Object
   * @params {Object} response - Response Object
   */
  retrieve(req, res) {
		documentUtils.ifDocumentExists(req, true).then((foundDocument) => {
			return res.status(200).send(
				documentUtils.formatDocumentList(foundDocument)
			)
		}).catch((err) => {
			return res.status(err.status).send({message: err.message})
		})
  },

  /**
   * deletes a particular document
   * @params {Object} request -Request Object
   * @params {Object} response -Response Object
   */
   delete(req, res) {
		 documentUtils.ifDocumentExists(req).then((foundDocument) => {
			 foundDocument.destroy()
			 	.then(() => {
					 return res.status(200).send({
						 message: 'Document successfully deleted'
					 })
				 })
		 }).catch(err => {
			 res.status(err.status).send({message: err.message})
		 });
  },

  /** updates a particular document
   * @params {Object} request -Request Object
   * @params {Object} response -Response Object
   */
  update(req, res) {
		 documentUtils.ifDocumentExists(req).then((foundDocument) => {
			 foundDocument.update(req.body)
			 	.then(() => {
					 return res.status(200).send({
						 message: 'Document successfully Updated'
					 })
				 })
		 }).catch(err => {
			 res.status(err.status).send({message: err.message})
		 });
  },


  search(request, response) {
  },

  listMyDocuments(request, response) {   
  }
}
  
export default documentController;
