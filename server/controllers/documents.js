const document = require('../models/document');

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
  }
}