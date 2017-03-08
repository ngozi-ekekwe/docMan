import  { Document , User, Role } from '../models';
import userUtils from '../ControllerUtils/UserUtils';
import authentication from '../middlewares/Authentication';
import jwt from 'jsonwebtoken';

const secret = 'supersecret';
let token;

const userController = {

  /**
   * creates a document
   * @params  {Object} request object
   * @params  {Object} response object
   * @returns {Object} response object
   */
   create(request, response) {
     userUtils.validate(request).then((user) => {
        User.create(request.body)
          .then((user) => {
            return response.status(200).send({
              message: 'User successfully created',
              token: authentication.generateToken(user),
              userId: user.dataValues.id
            })
          }).catch(error => {
            response.status(409).send({message: error.message})
          });   
     }).catch(error => {
       response.status(403).send({message: error.message})
     })
   },
	  
		/**
		 * deletes a user
		 * @params {Object} request object
		 * @params {Object} request object
		 */
   deleteUser(request, response) {
		 userUtils.ifUserExists(request).then((foundUser) => {
			 foundUser.destroy()
			 	.then(() => {
					 return response.status(200).send({
						 message: 'User successfully deleted'
					 })
				 })
		 }).catch(error => {
			 response.status(error.status).send({message: error.message})
		 });
  },

		/**update
		 * updates a user
		 * @params {Object} request object
		 * @params {Object} request object
		 */
  update(request, response) {
		 userUtils.ifUserExists(request).then((foundUser) => {
			 foundUser.update(request.body)
			 	.then(() => {
					 return response.status(200).send({
						 message: 'User successfully Updated'
					 })
				 })
		 }).catch(error => {
			 response.status(error.status).send({message: error.message})
		 });
  },

			/**logout
		 * logs a user out
		 * @params {Object} request object
		 * @params {Object} request object
		 */
	logout(request, response) {
    response.status(200).send({
      message: 'User successfully logged out'
    })
  },

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
              pagination: userUtils.indexPagination(request, page_count,total_count, query)
            });
        });
    });
  },

  retrieve(request, response) {
		userUtils.ifUserExists(request, true).then((foundUser) => {
			return response.status(200).send(
				userDetails(foundUser)
			)
		}).catch((error) => {
			return response.status(error.status).send({message: error.message})
		})
  },

  login(request, response) {
    User.findOne({where: {email: request.body.email}})
      .then((user) => {
        if (user && user.validPassword(request.body.password)) {
          const token = jwt.sign({
            UserId: user.id,
            RoleId: user.roleId
          }, secret, { expiresIn: '2 days' })
          return response.status(200).send({
            UserId: user.id,
            token, expiresIn: '2 days',
          });
        }
        return response.status(401).send({
          message: 'failed to authenticate user'
        });
      });
  },
}

export default userController;