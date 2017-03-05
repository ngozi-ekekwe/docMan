import jwt from 'jsonwebtoken';
import db from '../models';

const SECRET_KEY = 'supersecret';
const Role = db.Role

class Authentication {

  verifyToken(request, response, next) {
    const token = request.body.token ||
      request.headers['authorization'] ||
      request.headers['x-access-token']
      if (token) {
        jwt.verify(token, SECRET_KEY, (error, decoded) => {
          if (error) {
            response.status(401).send({
              status: 'Failed',
              message: 'Invalid token'
            })
          } else {
            request.decoded = decoded
            next();
  
          }
        })
      } else {
        response.status(401).send({
          status: 'Failed',
          message: 'Token required to access this route'
        })
      }

  }

  generateToken(user) {
    return jwt.sign({
      UserId: user.id,
      RoleId: user.roleId,
    }, SECRET_KEY, {expiresIn: '2 days'})
  }

  validateAdmin(request, response, next) {
    Role.findById(request.decoded.RoleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          response.status(401).send({
            success: false,
            message: 'You are not permitted to perform this action'
          });
        }
      })
  }
}

export default Authentication;

