import db from '../models';
import validate from '../ControllerUtils/RoleUtils';
const Role = db.Role;
 
const roleController = {

/**
 * create - create a new Role
 * @params  {Object} req Request object
 * @params  {Object} res Response object
 */
	create(req, res) {
	validate(request).then((role) => {
		switch(role) {
			case 'Fields Missing':
				return response.status(403).send({
					message: 'Some Fields are missing'
				});
				break;
		case true: 
			return response.status(409).send({
				message: 'Role already exists'
			});
			break;
		default:
			Role.create(request.body)
				.then(() => {
					return response.status(200).send({
						message: 'Role successfully created'
					})
				});
				break;
		};
	});
},

/**
 * fetchRoles - return all roles
 * @params {Object} req Request object 
 * @params {Object} res Response object
 * @returns {Object} res Response object
 */
	fetchRoles(request, response)  {
		let query = {};

		query.order = [
      ['createdAt', 'DESC']
    ];
		if (Number(request.query.limit) >= 0) query.limit = request.query.limit;
		if (Number(request.query.offset) >= 0) query.offset = (request.query.offset - 1) * 10;
		Role.findAndCountAll().then(roles => {
			let total_count;
		  total_count = roles;
			Role.findAll(query)
				.then((roles) => {
				const page_count = (total_count + 1) / 10;
					return response.status(200).json({
						roles,
						pagination: {
							page: Number(request.query.offset) || null,
							page_count: Math.floor((total_count.count + 1) / 10),
							page_size: Number(query.limit) || null,
							total_count: total_count.count + 1
						}
					});
				});
		});
	},

/**
 * updateRole - update a role
 * @param {Object} req request object
 * @param {Object} res response object
 */
	updateRole(request, response) {
		Role.findById(request.params.id)
			.then((foundRole) => {
				if (!foundRole) {
					response.status(404).send({
						message: 'Role Not Found'
					});
				};
				if(foundRole.title !== 'admin') {
					foundRole.update(request.body)
						.then((updatedRole) => {
							response.status(201).send({
								updatedRole
							});
						});
				} else {
					response.status(403).send({
						message: 'You are not permitted to perform this action'
					});
				};
			});
	},

/**
 * deleteRole -  delete a role
 * @param {Object}  req request object
 * @param {Object}  res response object
 */
	deleteRole(request, response) {
		Role.findById(request.params.id)
			.then((foundRole) => {
				if (!foundRole) {
					response.status(404).send({
						message: 'Role Not Found'
					});
				};
				if (foundRole) {
					if (foundRole.title !== 'admin') {
						foundRole.destroy()
							.then(() => {
								response.status(200).send({
									message: 'Role was successfully deleted'
								});
							});
					} else {
						response.status(403).send({
							message: 'You are not permitted to perform this action'
						});
					};
				};
			});
	},

/**
 * retrieve -  return a role
 * @param {Object}  req request object
 * @param {Object}  res response object
 */
	retrieve(request, response) {
		Role.findById(request.params.id)
			.then((role) => {
				if (!role) {
					return response.status(404).send({
						message: 'Role does not exists'
					});
				}
				else {
				return response.status(200).send({
					role
				});
				}
			})
	}
}

export default roleController;