const Document = require('../models').Document;

module.exports = {
  create(req, res) {
    return Document
    .create({
      title: req.body.title,
      content: req.body.content,
      access: req.body.access,
      userId: req.body.userId
    })
    .then(document => res.status(200).send(document))
    .catch(error =>res.status(400).send(error));
  },

  index(req, res) {
    return Document
      .all()
      .then(documents => res.status(201).send(documents))
      .catch(error => res.status(400).send(error))
  },

  retrieve(req, res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if(!document) {
          return res.status(404).send({message: 'Document not found'});
        }
        res.status(200).send(document);
      }).catch((error) => {
          res.status(400).send(error);
      });
  },
  /**
   * updates a role
   */
  update(req,res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if(!document) {
          return res.status(404).send({message: 'Document not found'});
        }
        return document
          .update(req.body)
          .then(() => {
            res.status(200).send(document);
          })
          .catch((error) => {
            res.send(error);
          })
      }).catch((error) => {
        res.send(error);
      })
  },

  /**
   * deletes a note
   */
  destroy(req,res) {
    return Document
      .findById(req.params.id)
      .then((document) => {
        if(!document) {
          return res.status(404).send({message: 'Document not found'});
        }
         document
          .destroy()
          .then(() => {
            res.status(200).send({message: 'Document successfully deleted'});
          }).catch((error) => {
            res.send(error);
          });
      }).catch((error) => {
          res.send(error);
      });
  }

}