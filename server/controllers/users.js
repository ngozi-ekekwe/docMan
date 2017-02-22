const User = require('../models').User;
const Document = require('../models').Document;
const jwt = require('jsonwebtoken');

const secret = 'supersecret';

module.exports = {
	/**
	 * create users
	 * 
	 */
	create(req, res) {
		User.findOne({ where: { email: req.body.email } })
			.then((existingUser) => {
				if (existingUser) {
					return res.status(409).send({ message: `User with ${req.body.email} already exits` })
				}
				User.create(req.body)
					.then((newUser) => {
						const token = jwt.sign({
							UserId: newUser.id,
							RoleId: newUser.roleId
						}, secret, { expiresIn: '2 days' });
						return res.status(201).send({ newUser, token });
					})
			})
			.catch((error) => {
				res.status(500).send(error);
			})
	},

	getAllUserDocuments(req, res) {
		return Document
			.findall({ where: { id: req.params.id } })
			.then((documents) => {
				res.status(201).send(documents);
			})
	},

	login(req, res) {
		User.findOne({ where: { email: req.body.email } })
			.then((foundUser) => {
				if (foundUser && foundUser.validPassword(req.body.password)) {
					const token = jwt.sign({
						UserId: foundUser.id,
						RoleId: foundUser.roleId
					}, secret, { expiresIn: '2 days' });
					return res.status(200).send({
						UserId: foundUser.id,
						token, expiresIn: '2 days',
						RoleId: foundUser.roleId
					});
				}
				return res.status(401).send({ message: 'Login failed' });
			})
	},

	logout(req, res) {
		return res.status(200).send({ messaeg: 'Successful Logout' });
	},
	/**
	 * lists all users
	 */
	index(req, res) {
		return User
			.all()
			.then((users) => res.status(200).send(users))
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