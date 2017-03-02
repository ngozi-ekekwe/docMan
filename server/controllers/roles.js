import db from '../models';

const Role = db.Role;

class RoleController {

  static verifyRequest(request) {
    if (
      request.body &&
      request.body.title
    ) { return true}
    else { false}
  }

  static create(request, response) {
    console.log((RoleController.verifyRequest(request)), '=================================>')
    if (RoleController.verifyRequest(request)) {
      return Role
        .create({
          title: request.body.title
        })
        .then((newRole) => {
          response.status(200).send(newRole)
        });
    }
    response.status(404).send({
      success: false,
      message: 'Error'
    });
  }

  static fetchRole(request, response) {
    Role.findAll()
      .then((roles) => {
        response.status(200).send(roles);
      });
  }

  static deleteRole(request, response) {
    Role.findOne({where: {id: request.body.id}})
      .then((role) => {
        if (role) {
          role.destroy()
            .then(() => {
              response.status(200).send({
                success: true,
                message: 'Role was successfully deleted'
              });
            })
        } else {
          response.status(404).send({
            success: false,
            message: 'Role not found'
          })
        }
      }).catch((error) => {
      response.status(401).send(error);
      });
  }

}

export default RoleController
