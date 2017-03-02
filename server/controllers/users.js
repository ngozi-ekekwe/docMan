import db from '../models';
import jwt from 'jsonwebtoken';
import Authentication from '../middlewares/auth';

const secret = 'supersecret';
const User = db.User;

class UserController {

  static verifyRequest(request) {
    if (
      request.body &&
      request.body.firstname &&
      request.body.lastname &&
      request.body.username &&
      request.body.email &&
      request.body.password &&
      request.body.roleId
    ) {
      return true;
    } else false;

  }

  static create(request, response) {
    if (UserController.verifyRequest(request)) {
      return User.create(request.body)
      .then((newUser) => {
        response.status(201).send({
          success: true,
          message: 'User created successfully',
          RoleId: newUser.roleId,
          UserId: newUser.id,
          user: newUser,
          token: Authentication.generateToken(newUser)
        })
      }).catch((error) => {
        response.status(400).send(error);
      })
    } else {
      response.status(500).send({
        success: false,
        message: 'Missing fields'
      });
    }
  }

  static delete(request, response) {
    User.findById(request.params.id)
      .then((foundUser) => {
        if(foundUser) {
          foundUser.destroy()
            .then(() => {
              response.status(200).send({
                success: true,
                message: 'User has been successfully deleted'
              })
            });
        } else {
          response.status(404).send({
            success: false,
            message: 'User Not Found'
          });
        }
      })
  }

  static index(request,response) {
    User.findAll({})
      .then(users => {
        response.status(200).send(users)
      });
  }

  static retrieve(request, response) {
    User.findById(request.params.id)
      .then((user) => {
        if (user) {
          response.status(200).send(user);
        } else {
          response.status(404).send({
            success: false,
            message: 'User not found'
          });
        }
      });
  }

  static update(request, response) {
    User.findById(request.params.id)
      .then((user) => {
        if (user) {
          user.update(request.body)
            .then((updatedUser) => {
              response.status(200).send(updatedUser);
            })
        } else {
          response.status(401).send({
            message: 'Unauthorized'
          });
        }
      }).catch((error) => {
          response.status(404)
            .send(error.message);
      })
  }

  static login(request, response) {
    User.findOne({where: {email: request.body.email}})
      .then((user) => {
        if (user && user.validPassword(request.body.password)) {
          const token = jwt.sign({
            UserId: user.id,
            RoleId: user.roleId
          }, secret, { expiresIn: '2 days' })
          response.status(200).send({
            UserId: user.id,
            token, expiresIn: '2 days',
            RoleId: user.roleId
          });
        } else {
          response.status(401).send({
            success: false,
            message: 'failed to authenticate user'
          });
        }
      })
  }

  static logout(request, response) {
    response.status(200).send({
      success: true,
      message: 'User successfully logged out'
    })
  }

}
 export default UserController;
