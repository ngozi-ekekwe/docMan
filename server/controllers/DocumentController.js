import  { Document , User, Role } from '../models';
import validate, {indexPagination} from './ControllerUtils/DocumentUtils';


class DocumentController {
   create(request, response) {
    validate(request).then((doc) => {
      switch(doc) {
        case 'Fields Missing':
          return response.status(403).send({
            message: 'Some Fields are missing'
          });
          break;
      case true: 
        return response.status(409).send({
          message: 'Document already exists'
        });
        break;
      default:
        Document.create(request.body)
          .then(() => {
            return response.status(200).send({
              message: 'Document successfully created'
            })
          });
          break;
      };
    });
  }

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
              pagination: indexPagination(request, page_count,total_count, query)
            });
        });
    });
  };


  retrieve(request, response) {
    Document.findById(request.params.id)
      .then((foundDocument) => {
        if (!foundDocument) {
          return response.status(404).send({
            message: 'Document Not Found'
          })
        }
        const body = request.body 
        if (foundDocument.access === 'public' 
          || foundDocument.access === 'private' && 
          foundDocument.ownerId === request.decoded.UserId
          ) {
          return response.status(200).send({
            Title: foundDocument.title,
            Content: foundDocument.content,
            Published: foundDocument.createdAt
          })
        }
        if (foundDocument.access === 'private' && foundDocument.owner !== request.decoded.UserId) {
          return response.status(403).send({
            message: 'This Document is Private'
          });
        };

        if (request.decoded.RoleId === 1) {
          Document.findById(request.params.id)
            .then(foundDocument => {
              return response.status(200).send({
                foundDocument
              });
            })
        };
      });
  }

  delete(request, response) {
    Document.findById(request.params.id)
      .then((foundDocument) => {
        if (!foundDocument) {
          return response.status(404).send({
            message: 'Document Not Found'
          });
        };
        if (foundDocument.ownerId !== request.decoded.UserId) {
          return response.status(403).send({
            message: 'You can only delete your document'
          })
        }
        foundDocument.destroy()
          .then(() => {
            return response.status(200).send({
              message: 'Document successfully deleted'
            });
          })
      });
  }

  update(request, response) {
    Document.findById(request.params.id)
    .then((foundDocument) => {
      if (!foundDocument) {
        return response.status(404).send({
          message: 'Document not found'
        })
      }
      if (foundDocument.owner !== request.decoded.UserId) {
        return response.status(403).send({
          message: 'You can only update your document'
        })
      }
      foundDocument.update(request.body)
        .then((updatedDocument) => {
          return response.status(200).send({
            message: 'Document successfully updated'
          })
        })
    })
}

  }

export default DocumentController;
