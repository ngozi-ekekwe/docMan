import chai from 'chai';
import supertest from 'supertest';
import db from '../../models';
import helper from '../test-helper';
import app from '../../../server';

const expect = chai.expect;
const request = supertest(app);
const params = helper.regularUser;

let token;

describe('Authorisation middleware', () => {
  before((done) => {
    db.Role.create({ title: 'admin' })
      .then((newRole) => {
        params.roleId = newRole.id;
        return db.User.create(params);
      })
      .then(() => {
        request.post('/api/users/login')
          .send(params)
          .end((err, res) => {
            if (err) return err;
            token = res.body.token;
            done();
          });
      });
  });

  after(() => db.sequelize.sync({ force: true }));

  it('should return unauthorised without a token', (done) => {
    request.get('/api/users')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return unauthorised for invalid token', (done) => {
    request.get('/api/users')
      .set({ Authorization: 'invalid token' })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
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
      .send({ email: 'ngozi.ekekwe@yahoo.com', password: 'hello' })
      .end((err, res) => {
        if (err) return err;
        expect(res.status).to.equal(200);
        done();
      });
  });
});
