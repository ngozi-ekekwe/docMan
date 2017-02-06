const Role = require('../models').Role;

module.exports = {
  create(req, res) {
     console.log(req);
    return Role
      .create({
        title: req.body.title,
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error))
  }, 

  index(req, res) {
    return Role
      .all()
      .then(roles => res.status(201).send(roles))
      .catch(error => res.status(400).send(error));
  }
}
