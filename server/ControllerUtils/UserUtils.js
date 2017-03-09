import validateParameters from '../ControllerUtils/Utils';
import { User } from '../models';

let found
const requiredParameters = ['firstname', 'lastname', 'username', 'password', 'email'];

const userUtils = {
/**
 * validate
 * Checks request parameters to ensure they are valid
 * @param {Object} request object 
 * @returns promise
 */
validate(request) {
	return new Promise((resolve, reject) => {
		if (validateParameters(request, requiredParameters)) {
		User.findOne({
			where: {email: request.body.email}
		})
		.then((foundUser) => {
			if(foundUser) {
				return reject({message: 'User with email already exists', status: 409})
			}
			resolve(foundUser);
		});
		}
		else {
			reject({message: 'Some Fields are missing', status: 403});
		}	
	});
},

/**
 * indexPagination
 * method returns meteData for pagination
 * @request {Object} request object
 * @param page_count {Number} Number
 * @param total_count {Number} 
 */
indexPagination(request,page_count, total_count, query) {
	return({
	page: Number(request.query.offset) || 1,
	page_count: Math.floor((total_count.count + 1) / 10),
	page_size: Number(query.limit) || 1,
	total_count: total_count.count
	});
},


/**
 * userDetails
 * format user details 
 * @param {Object} user object
 * @returns {Object}
 */
userDetails(user) {
	const profile = {
		id: user.id,
		firstname: user.firstname,
		lastname: user.lastname,
		username: user.username,
		email: user.email,
		roleId: user.roleId,
		createdAt: user.createdAt
	}
	return profile
},

/**
 * ifUserExists
 * Checks if a user exists
 * @param {Object} request object
 * @param {Boolean} allowAdmin
 */
ifUserExists(request, allowAdmin) {
	return new Promise((resolve, reject) => {
		User.findById(request.params.id)
			.then((foundUser) => {
				if (!foundUser) return reject({message: 'User Not Found', status: 404});

				if (allowAdmin && request.decoded.RoleId === 1 || foundUser.id === request.decoded.UserId) {
					return resolve(foundUser);
				}
				if (foundUser && foundUser.id !== request.decoded.UserId) {
          return reject({message: 'You can only have access to your account', status: 403});
        }
				return resolve (foundUser);
			});
	});
}

}

module.exports = userUtils;