import  { Document , User, Role } from '../models';
import validate, {indexPagination} from './ControllerUtils/UserUtils';
import jwt from 'jsonwebtoken';
import Authentication from '../middlewares/Authentication';

const secret = 'supersecret';
const auth = new Authentication();

class UserController {
   create(request, response) {
     let user = validate(request);
     switch(user) {
       case 'Fields Missing':
          return response.status(403).send({
            message: 'Some Fields are missing'
          });
          break;
      case true: 
        return response.status(409).send({
          message: 'User already exists'
        });
        break;
      default:
        User.create(request.body)
          .then(() => {
            return response.status(200).send({
              message: 'User successfully created'
            })
          });
          break;
     };
   }

   delete(request, response) {
     User.findById(request.params.id)
      .then((foundUser) => {
        if (!foundUser) {
          return response.status(404).send({
            message: 'User not Found'
          });
        };
        if (foundUser.id !== request.decoded.UserId) {
          return response.status(403).send({
            message: 'You can only delete your record'
          });
        };
        foundUser.destroy()
          .then(() => {
            return response.status(200).send({
              message: 'User successfully deleted'
            })
          });
      });
  }

  index(request,response) {
    let query = {}
    query.order = [
      ['createdAt', 'DESC']
    ];
    if(Number(request.query.limit) >= 0) query.limit = request.query.limit;
    if(Number(request.query.offset >=0)) query.offset = request.query.offset;
    User.findAndCountAll().then((users) => {
      let total_count;
      total_count = users;
      User.findAll(query)
        .then((users) => {
          const page_count = (total_count +1) / 10;
            return response.status(200).json({
              users,
              pagination: {
                page: Number(request.query.offset) || null,
                page_count: Math.floor((total_count.count + 1) / 10),
                page_size: Number(query.limit) || null,
                total_count: total_count.count
              }
            });
        });
    });

  };

  retrieve(request, response) {
    User.findById(request.params.id)
      .then((foundUser) => {
        if (!foundUser) {
          return response.status(404).send({
            message: 'User Not Found'
          });
        };
        if (request.decoded.RoleId === 1) {
          return response.status(200).send({
            foundUser
          });
        } 
        return response.status(200).send({
          firstname: foundUser.firstname,
          lastname: foundUser.lastname,
          username: foundUser.username,
          email: foundUser.email
        });
      });
  }

  update(request, response) {
    User.findById(request.params.id)
      .then((foundUser) => {
        if (!foundUser) {
          return response.status(404).send({
            message: 'User Not Found'
          });
        }
        if (foundUser.id !== request.decoded.UserId) {
          return response.status(403).send({
            message: 'You can only update your Record'
          });
        }
        foundUser.update(request.body)
          .then((updatedUser) => {
            return response.status(200).send({
              message: 'User successfully updated'
            });
          });
      });
  }

  login(request, response) {
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
          });
        } else {
          response.status(401).send({
            message: 'failed to authenticate user'
          });
        }
      })
  }

  logout(request, response) {
    response.status(200).send({
      message: 'User successfully logged out'
    })
  }

}
 export default UserController;
