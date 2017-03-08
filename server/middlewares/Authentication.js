import jwt from 'jsonwebtoken';
import db from '../models';

const SECRET_KEY = 'supersecret';
const Role = db.Role

const authentication = {
  verifyToken(request, response, next) {
    const token = request.body.token ||
      request.headers['authorization'] ||
      request.headers['x-access-token']
      if (token) {
        jwt.verify(token, SECRET_KEY, (error, decoded) => {
          if (error) {
            response.status(401).send({
              message: 'Invalid token'
            });
          } else {
            request.decoded = decoded
            next();
          };
        });
      } else {
        response.status(401).send({
          message: 'Token required to access this route'
        });
      };
  },
  
  /**
   * generateToken generates token for authentication
   * @param {Object} user object
   * 
   */
   generateToken(user) {
    return jwt.sign({
      UserId: user.id,
      RoleId: user.roleId,
    }, SECRET_KEY, {expiresIn: '2 days'})
  },

  /**
   * validateAdmin
   * @param {Object} request object
   * @param {Object} request object
   * @param {Object} next
   */
  validateAdmin(request, response, next) {
    Role.findById(request.decoded.RoleId)
      .then((role) => {
        if (role.title === 'admin') {
          next();
        } else {
          response.status(401).send({
            message: 'You are not permitted to perform this action'
          });
        }
      });
  }

}

export default authentication;

