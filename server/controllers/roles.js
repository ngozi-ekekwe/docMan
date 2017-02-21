const Role = require('../models').Role;

module.exports = {
  /**
   * create a new role
   */
  create(req, res) {
     console.log(req.body);
     console.log("got here");
    return Role
      .create({
        title: req.body.title,
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send({error}))
  }, 
  /**
   * return all roles
   */
  index(req, res) {
    return Role
      .all()
      .then(roles => res.status(201).send(roles))
      .catch(error => res.status(400).send(error));
  },

  /**
   * return a particular role
   */
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
  /**
   * updates a role
   */
  update(req,res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if(!role) {
          return res.status(404).send({message: 'Role not found'});
        }
        return role
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

  /**
   * deletes a note
   */
  destroy(req,res) {
    return Role
      .findById(req.params.id)
      .then((role) => {
        if(!role) {
          res.status(404).send({message: 'Role not found'});
        }
        return role
          .destroy()
          .then(() => {
            res.status(204).send({message: 'Role successfully deleted'});
          }).catch((error) => {
            res.send(error);
          });
      }).catch((error) => {
          res.send(error);
      });
  }

  
}
