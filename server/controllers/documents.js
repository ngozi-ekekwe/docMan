const document = require('../models').Document;

module.exports = {
  create(req, res) {
    return document
    .create({
      title: req.body.title,
      content: req.body.content,
      access: req.body.access
    })
    .then(document => res.status(200).send(document))
    .catch(error =>res.status(400).send(error));
  },

  index(req, res) {
    return document
      .all()
      .then(document => res.status(201).res.send(document))
      .catch(error => res.staus(400).res.send(error))
  }
}