const Role = require('../models').Role;

module.exports = {
  create(req, res) {
    return Role
      .create({
        title: req.body.title,
      })
      .then(role => res.status(200).send(role))
      .catch(error => res.status(400).send({error}))
  }, 

  index(req, res) {
    return Role
      .findAll()
      .then(roles => res.status(200).send(roles))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if(!role) {
          return res.status(404).send({message: 'Role not found'});
        }
        res.status(200).send(role);
      }).catch((error) => {
          res.status(400).send(error);
      });
  },

  update(req,res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if(!role) {
          return res.status(404).send({message: 'Role not found'});
        }
         role
          .update({
            title: req.body.title || role.title
          })
          .then(() => {
            res.status(200).send(role);
          })
          .catch((error) => {
            res.send(error);
          })
      }).catch((error) => {
        res.send(error);
      })
  },

  destroy(req,res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if(!role) {
          return res.status(404).send({message: 'Role not found'});
        }
        role
          .destroy()
          .then(() => {
            res.status(200).send({message: 'Role successfully deleted'});
          }).catch((error) => {
            res.send(error);
          });
      }).catch((error) => {
          res.send(error);
      });
  }  
}
