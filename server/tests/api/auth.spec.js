const app = require('../../../server');
const expect = require('chai').expect;
const request = require('supertest')(app);
const db = require('../../models');
const helper = require('../test-helper');


const params = helper.regularUser;
const roleParams = helper.adminRole;

let token;

describe('MIDDLEWARE TEST', () => {
	before((done) => {
		db.Role.create(roleParams)
			.then((newRole) => {
				params.roleId = newRole.id
				request.post('/users')
					.send(params)
					.end((err, res) => {
						token = res.body.token
						done();
					});
			});
	});

	after(() => db.sequelize.sync({ force: true }));

	it('should return `unauthorized` without a token', () => {
		request.get('/users')
			.end((err, res) => {
				expect(res.status).to.equal(401);
			})
	});

	it('should return `invalid` for unauthorized token', () => {
		request.get('/users')
			.set({ Authorization: 'invalid token' })
			.end((err, res) => {
				expect(res.status).to.equal(401);
			});
	});

	it('should return all users for valid token', () => {
		request.get('/users')
			.set({ Authorization: token })
			.end((err, res) => {
				expect(res.status)
			})
	})
});