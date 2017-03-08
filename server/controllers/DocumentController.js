import  { Document , User, Role } from '../models';
import documentUtils from '../ControllerUtils/DocumentUtils';

const documentController = {

/**
   * creates a new Document
   * @params {Object} Request object
   * @params {Object} Response object
   * @returns {Object} Response object
   */
   create(request, response) {
     documentUtils.validate(request).then((document) => {
        Document.create(request.body)
          .then((document) => {
            return response.status(200).send({
              message: 'Document successfully created',
            })
          }).catch(error => {
            response.status(error.status).send({message: error.message})
          });   
     }).catch(error => {
       response.status(error.status).send({message: error.message})
     })
   },

  /**
   * Lists all Documents
   * @params {Object} request -Request object
   * @Params {Object} response - Response Object
   */
   index(request,response) {
    let query = {}
    query.order = [
      ['createdAt', 'DESC']
    ];
    if(Number(request.query.limit) >= 0) query.limit = request.query.limit;
    if(Number(request.query.offset >=0)) query.offset = request.query.offset;
    Document.findAndCountAll().then((documents) => {
      let total_count;
      total_count = documents;
      Document.findAll(query)
        .then((documents) => {
          const page_count = (total_count +1) / 10;
            return response.status(200).json({
              documents,
              pagination: documentUtils.indexPagination(request, page_count,total_count, query)
            });
        });
    });
  },

  /**
   * returns a particular document
   * @params {Object} request - Request Object
   * @params {Object} response - Response Object
   */
  retrieve(request, response) {
		documentUtils.ifDocumentExists(request, true).then((foundDocument) => {
			return response.status(200).send(
				documentUtils.formatDocumentList(foundDocument)
			)
		}).catch((error) => {
			return response.status(error.status).send({message: error.message})
		})
  },

  /**
   * deletes a particular document
   * @params {Object} request -Request Object
   * @params {Object} response -Response Object
   */
   delete(request, response) {
		 documentUtils.ifDocumentExists(request).then((foundDocument) => {
			 foundDocument.destroy()
			 	.then(() => {
					 return response.status(200).send({
						 message: 'Document successfully deleted'
					 })
				 })
		 }).catch(error => {
			 response.status(error.status).send({message: error.message})
		 });
  },

  /** updates a particular document
   * @params {Object} request -Request Object
   * @params {Object} response -Response Object
   */
  update(request, response) {
		 documentUtils.ifDocumentExists(request).then((foundDocument) => {
			 foundDocument.update(request.body)
			 	.then(() => {
					 return response.status(200).send({
						 message: 'Document successfully Updated'
					 })
				 })
		 }).catch(error => {
			 response.status(error.status).send({message: error.message})
		 });
  },


  search(request, response) {
  },

  listMyDocuments(request, response) {   
  }
}
  
export default documentController;
