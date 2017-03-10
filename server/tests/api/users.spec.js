import chai from 'chai';
import supertest from 'supertest';
import db from '../../models';
import helper from '../helpers/UserHelper';
import app from '../../../server';

const request = supertest(app);
const expect = chai.expect;
const goodUser = helper.goodUser;
const adminUser = helper.adminUser;

let token, userId;

describe('User API', () => {
  before(() => {
    db.Role.create(helper.adminRole)
      .then((newRole) => {
        adminUser.roleId = newRole.id;
        db.User.create(adminUser);
        db.Role.create(helper.regularRole);
      });
  });

  after(() => db.sequelize.sync({ force: true }));

  describe('Create User', () => {
    it('should not create a user with missing fields', (done) => {
      request.post('/api/users')
        .send(helper.badUser)
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal(
            'Some Fields are missing');
          done();
        });
    });

    it('should allow the creation of unique user', (done) => {
      request.post('/api/users')
        .send(helper.adminUser)
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(409);
          done();
        });
    });

    it('should only allow for creation of unique users', (done) => {
      request.post('/api/users')
        .send(helper.duplicateUser)
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal(
            'User with email already exists');
          done();
        });
    });

    it('assigns regular roles to new users', (done) => {
      request.post('/api/users')
        .send(helper.noRoleUser)
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(200);
          expect(res.body.roleId).to.equal(2);
          done();
        });
    });

    it('should create a user with valid credentials', (done) => {
      request.post('/api/users/')
        .send(goodUser)
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(200);
          expect(res.token).to.not.equal(null);
          done();
        });
    });

    it('should return a token on successful login', (done) => {
      request.post('/api/users/login')
        .send(helper.loginParams)
        .end((err, res) => {
          if (err) return err;
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.not.equal(null);
          done();
        });
    });

    it('should fail to authenticate a user if credentials are invalid',
      (done) => {
        request.post('/api/users/login')
          .send({})
          .end((err, res) => {
            if (err) return err;
            expect(res.body.message).to.equal(
              'failed to authenticate user');
            expect(res.status).to.equal(401);
            done();
          });
      });

    it('should log out a user successfully', () => {});

    describe('Get Users', () => {
      before((done) => {
        request.post('/api/users/login')
          .send({ email: 'therealng.com', password: 'hello' })
          .end((err, res) => {
            userId = res.body.userIdentity;
            token = res.body.token;
            done();
          });
      });

      after(() => db.User.destroy({ where: { id: userId } }));

      it(
        'should return User Not found for a user that does not exist',
        (done) => {
          request.get('/api/users/20')
            .set({ Authorization: token })
            .end((err, res) => {
              if (err) return err;
              expect(res.status).to.equal(404);
              expect(res.body.message).to.equal(
                'User Not Found');
              done();
            });
        });
    });
  });
});
