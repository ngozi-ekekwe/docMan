import db from '../models';
import Utils from '../controllers/Utils';

const util = new Utils();
const Role = db.Role;
const requiredParameters = ['title']

class RoleController {
	
	create(request, response) {
		if (util.validateParameters(request, requiredParameters)) {
			return Role
				.create({
					title: request.body.title
				})
				.then((newRole) => {
					response.status(200).send(newRole)
				});
		} else {
			response.status(401).send({
				message: 'Some fields are missing'
			});
		};
	};

	fetchRole(request, response) {
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
	};

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
	};

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
	};
};

export default RoleController
