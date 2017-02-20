const User = require('../models').User;
const jwt = require('jsonwebtoken');

const secret = 'super secret';

module.exports = {
	/** creates a new user */
	create(req, res) {
		User.findOrCreate({
			where: {
				email: req.body.email
			},
			defaults: {
				username: req.body.username,
				password: req.body.password,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				roleId: req.body.roleId,
				email: req.body.email
			}
		}).spread((newUser, created) => {
			console.log('New::::::::::::::::::::::::', newUser);
			if (created) {
				const token = jwt.sign(newUser, secret, {
					expiresIn: '24h'
				});
				return res.status(200).send({
					success: true,
					message: 'Authentication successful. User logged in',
					token: token
				});
			} else {
				return res.status(409).send({ message: 'User already already' });
			}
		})
	},
	/**
	 * lists all users
	 */
	index(req, res) {
		return User
			.all()
			.then((users) => res.status(201).send(users))
			.catch((error) => res.status(401).send)
	},

	/**
	 * retrieve a particular user
	 */
	retrieve(req, res) {
		return User
			.findById(req.params.id)
			.then((user) => {
				if (!user) {
					return res.status(404).send({ message: 'user not found' });
				}
				res.send(user);
			})
	},

	update(req, res) {
		return User
			.findById(req.params.id)
			.then((user) => {
				if (!user) {
					return res.status(404).send({ message: 'User not found' });
				}
				return user
					.update(req.body)
					.then(() => res.status(200).send(user))
					.catch((error) => res.send(error))
			}).catch((error) => res.send(error));
	},

	destroy(req, res) {
		return User
			.findById(req.params.id)
			.then((user) => {
				if (!user) {
					res.status(404).send({ message: 'User not found' });
				}
				return user
					.destroy()
					.then(() => {
						res.status(204).send({ message: 'User successfully deleted' });
					}).catch((error) => {
						res.send(error);
					});
			}).catch((error) => {
				res.send(error);
			});
	}

}