import  {
  Document,
  User,
  Role
} from '../models'


class DocumentController {


  static verifyRequest(request) {
    if (request.body.title && request.body.content) {
      return true
    } else {
      return false
    }
  }

  static resData(statusCode, success, message, data, response) {
    return (
      response.status(statusCode).send({
        success,
        message,
        data
      })
    )
  }

  static isAdmin(userRole, userId) {
    let query = {}
    if (userRole.dataValues.roleId === 1) {
      return query
    } else {
      return query = {
        where: {
          userId
        }
      }
    }
  }

  static create(request, response) {
    if (DocumentController.verifyRequest(request)) {
      return Document.create({
        title: request.body.title,
        content: request.body.content,
        access: request.body.access,
        userId: request.decoded.UserId
      })
      .then((document) => {
        response.status(201).send({
          success: true,
          message: 'Document Created',
          document
        })
      }).catch((error) => {
        response.status(400).send(error);
      })
    } else {
      response.status(500).send({
        success: false,
        message: 'Missing fields'
      })
    }
  }

  static index(request, response) {
    Role.find({
      where: { id: request.decoded.RoleId}
    }).then((userRole) => {
      const userId = request.decoded.UserId;
      const query = DocumentController.isAdmin(userRole, userId);
      query.order = [
        ['createdAt', 'DESC']
      ];
      if (request.query.limit >= 0) query.limit = request.query.limit;
      if (request.query.offset >= 0) query.offset = (request.query.offset - 1) * 10;

      Document.findAll(query)
        .then((documents) => {
          response.status(201).send({
            success: true,
            documents
          })
        });
    });
  }

  static retrieve(request, response) {
    Document.findById(request.params.id)
      .then((doc) => {
        if (!doc) {
          response.status(404).send({
            success: false,
            message: 'Document Not Found'
          })
        }
        const document = doc;
        if (document.access === 'public' || (document.access === 'private' && document.userId === req.decoded.UserId)) {
          return response.status(200).send({
            message: doc
          });
        }

        if (document.access === 'private' && document.userId !== request.decoded.UserId) {
          return response.status(401).send({
            message: 'Unauthorised to view this document'
          });
        }
        if (document.access === 'role') {
          User.find({
              where: {
                id: document.userId
              }
            })
            .then((foundUser) => {
              if (foundUser.roleId === req.decoded.RoleId) {
                return response.status(201).send({
                  message: 'A document was found',
                  doc: doc
                })
              } else {
                return response.status(403)
                  .send({
                    message: 'Unauthorised to view this document'
                  });
              }
            });
        }
      });
  }

  /**
   * deletes a note
   */
  static destroy(request, response) {
    const Owner = request.decoded.UserId;
    let role;
    User.findById(Owner).then((user) => { role = user.dataValues.roleId; });
    Document.findOne({
      where: {
        id: request.params.id
      }
    })
      .then((document) => {
        if (document.userId === Owner || role === 1) {
          document.destroy()
            .then(() => response.status(200).send({
              success: true,
              message: 'Document has been successfully deleted'
            }));
        } else {
          response.status(403).send({
            success: false,
            message: 'You are not authorized to delete this document'
          });
        }
      })
        .catch(error => response.status(404).send(error));
  }

    /**
   * updates a role
    */
  static update(request, response) {
    const Owner = request.decoded.UserId;
    let role;
    User.findById(Owner).then((user) => { role = user.dataValues.roleId; });
    Document.findOne({
      where: {
        id: request.params.id
      }
    })
      .then((document) => {
        if (!document) { response.status(404).send({
          success: false,
          message: 'Document Not Found'
        })};
        if (document.userId === Owner || role === 1) {
          document.update(request.body)
            .then(updatedDocument => response.status(200).send(updatedDocument))
            .catch(error => response.status(401).send(error));
        } else {
          response.status(401).send({
            success: false,
            role: role,
            message: 'You are not authorized to update this document'
          });
        }
      })
        .catch(error => response.status(401).send(error));
  }

  };

export default DocumentController;
