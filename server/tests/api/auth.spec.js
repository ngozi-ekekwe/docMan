import  app from '../../../server';
import chai from 'chai';
import supertest from 'supertest';
import db from '../../models';
import  helper from  '../test-helper';

const expect = chai.expect;
const request = supertest(app);
const params = helper.regularUser;
const roleParams = helper.adminRole;

let token;

describe('MIDDLEWARE AUTH TEST', () => {
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
				if (err) return err;
				expect(res.status).to.equal(200);
			})
	});
});
