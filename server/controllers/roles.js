import  db from  '../models';

module.exports = {
  create(req, res) {
    return db.Role
      .create({
        title: req.body.title,
      })
      .then(role => res.status(200).send(role))
      .catch(error => res.status(400).send({error}))
  },

  index(req, res) {
    return db.Role
      .findAll()
      .then(roles => res.status(200).send(roles))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return db.Role
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
    return db.Role
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
    return db.Role
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
