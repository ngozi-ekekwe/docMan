import  app from '../../../server';
import chai from 'chai';
import supertest from 'supertest';
import db from '../../models';
import  helper from  '../test-helper';

const expect = chai.expect;
const request = supertest(app);
const userParams = helper.adminUser;
const roleParams = helper.adminRole;
const regularRole = helper.regularRole;

let role, token

describe('ROLE SPEC', () => {
  before((done) => {
    db.Role.create(roleParams)
      .then((newRole) => {
        userParams.roleId = newRole.id;
        request.post('/api/users')
          .send(userParams)
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      })
  });

  after(() => db.sequelize.sync({ force: true }));

  describe('Create new Role', () => {
    beforeEach(() => {
        db.Role.create(regularRole)
            .then((newRole) => {
                role = newRole
            }).catch((error) => {
                return error
            });
    });

    after(() => db.Role.destroy({where: {id: role.id}}))

    it('should return `unauthorized` when a token is not passed', (done) => {
      request.get('/api/roles')
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('Token required to access this route');
          done();
        })
    });

    it('should return all roles to an admin user', (done) => {
      request.get('/api/roles')
        .set({ Authorization: token })
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(200);
          done();
        })
    });

    it('should not create a new role if title fields is missing', () => {
      request.post('/api/roles')
        .set({Authorization: token})
        .send({})
        .end((err, response) => {
          if (err) return err;
          expect(response.status).to.equal(403);
        });
    });

    it ('should not create a role that already', () => {
      const dup = {title: 'admin'}
      request.post('/api/roles')
        .set({Authorization: token})
        .send(dup)
        .end((err, response) => {
          if (err) return err;
          expect(response.status).to.equal(409);
        });
    });

    it ('should create a role with a unique title', (done) => {
      request.post('/api/roles')
        .send({title: 'author'})
        .set({Authorization: token})
        .end((err, response) => {
          if (err) return err;
          expect(response.status).to.equal(200);
          done();
        })
    });

    it ('should fail for invalid attributes', () => {
      request.post('/api/roles')
        .send({name: 'hello'})
        .set({Authorization: token})
        .end((err, response) => {
          if (err) return err;
          expect(response.status).to.equal(403);
        })
    });

    it ('should return the correct role when an id is passed', (done) => {
      request.get(`/api/roles/${role.id}`)
        .set({Authorization: token})
        .end((err, response) => {
          if (err) return err
          expect(response.status).to.equal(200);
          done();
        });
    });

    it ('should update an existing role', (done) => {
      request.put(`/api/roles/${role.id}`)
        .send({title: 'role'})
        .set({Authorization: token})
        .end((err, response) => {
          if (err) return err
          expect(response.status).to.equal(201)
          done();
        })
    });

    it ('should delete a role', (done) => {
      request.delete(`/api/roles/${role.id}`)
        .set({Authorization: token})
        .end((err, response) => {
          if (err) return err;
          expect(response.status).to.equal(200);
          done();
        })
    });

  });
});
