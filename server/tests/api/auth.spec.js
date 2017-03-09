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
				request.post('/api/users')
					.send(params)
					.end((err, res) => {
						token = res.body.token
						done();
					});
			});
	});

	after(() => db.sequelize.sync({ force: true }));

	it('should return `unauthorized` without a token', () => {
		request.get('/api/users')
			.end((err, res) => {
				expect(res.status).to.equal(401);
			})
	});

	it('should return `invalid` for unauthorized token', () => {
		request.get('/api/users')
			.set({ Authorization: 'invalid token' })
			.end((err, res) => {
				expect(res.status).to.equal(401);
			});
	});

	it('should return all users for valid token', (done) => {
		request.get('/api/users')
			.set({ Authorization: token })
			.end((err, res) => {
				if (err) return err;
				expect(res.status).to.equal(200);
				done();
			});
	});

	it('should successfully login a user', (done) => {
		request.post('/api/users/login')
			.send({email: 'ngozi.ekekwe@yahoo.com', password: 'hello'})
			.end((err, res) => {
				if (err) return err;
				expect(res.status).to.equal(200);
				expect(res.token).to.be.defined;
				done();
			})
	})
});
