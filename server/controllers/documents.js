import  db from '../models'

const Document = db.Document;

class DocumentController {
   static create(request, response) {
    return Document
    .create({
      title: request.body.title,
      content: request.body.content,
      access: request.body.access,
      userId: request.decoded.userId
    })
    .then(document => response.status(200).send(document))
    .catch(error =>response.status(400).send(error));
  }

   static index(request, response) {
    return Document
      .all()
      .then(documents => response.status(201).send(documents))
      .catch(error => response.status(400).send(error))
  }

  static retrieve(request, response) {
    return Document
      .findById(request.params.id)
      .then((document) => {
        if(!document) {
          return response.status(404).send({message: 'Document not found'});
        }
        response.status(200).send(document);
      }).catch((error) => {
          response.status(400).send(error);
      });
  }
  /**
   * updates a role
   */
  static update(request,response) {
    return Document
      .findById(request.params.id)
      .then((document) => {
        if(!document) {
          return response.status(404).send({message: 'Document not found'});
        }
        return document
          .update(request.body)
          .then(() => {
            response.status(200).send(document);
          })
          .catch((error) => {
            response.send(error);
          })
      }).catch((error) => {
        response.send(error);
      })
  }

  /**
   * deletes a note
   */
  static destroy(request,response) {
    return Document
      .findById(request.params.id)
      .then((document) => {
        if(!document) {
          return response.status(404).send({message: 'Document not found'});
        }
         document
          .destroy()
          .then(() => {
            response.status(200).send({message: 'Document successfully deleted'});
          }).catch((error) => {
            response.send(error);
          });
      }).catch((error) => {
          response.send(error);
      });
  }

};

export default DocumentController;
