const jwt = require('jsonwebtoken');
const db = require('../models');

const secret = 'supersecret';
const Auth = {
	verifyToken(req, res, next) {
		const token = req.body.token || req.query.token || req.headers['authorization'];
		if (!token) {
			return res.status(401).send({ message: 'Unauthorized Access' })
		}
		//verify jwt token
		jwt.verify(token, secret, (error, decoded) => {
			if (error) {
				return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
			}
			else {
				req.decoded = decoded;
				next();
			}
		})
	},
	validateAdmin(req, res, next) {
		db.Role.findById(req.decoded.RoleId)
			.then((role) => {
				if (role.title === 'admin') {
					next();
				} else {
					return res.status(403).send('you are not an admin');
				}
			})
	}
}

module.exports = Auth;

