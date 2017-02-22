const app = require('../../../server');
const expect = require('chai').expect;
const request = require('supertest')(app);
const db = require('../../models');
const helper = require('../test-helper');

const userParams = helper.regularUser;

let role, token

describe('Roles API', () => {
  before((done) => {
    db.Role.create(helper.adminRole)
      .then((newRole) => {
        userParams.roleId = newRole.id;
        request.post('/users')
          .send(userParams)
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });
  });

  after(() => db.Role.sequelize.sync({ force: true }));

  describe('CONTEXT: WIth existing role', () => {
    beforeEach(() => 
      db.Role.create(helper.regularRole)
        .then((newRole) => {
          role = newRole;
        }));

    afterEach(() => db.Role.destroy({ where: { id: role.id } }));

    describe('Get all GET: /roles', () => {
      it('should return unauthorised for no token', (done) => {
        request.get('/roles')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            done();
          });
      });

      it('should return all roles', (done) => {
        request.get('/roles')
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(Array.isArray(res.body)).to.be.true;
            expect(res.body.length).to.not.equal(0);
            done();
          });
      });
    });

    describe('Get role GET: /roles/:id', () => {
      it('should get correct role', (done) => {
        request.get(`/roles/${role.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal(role.title);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.get('/roles/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Edit role PUT: /roles/:id', () => {
      it('updates the role attributes', (done) => {
        const newAttributes = { title: 'role' };

        request.put(`/roles/${role.id}`)
          .send(newAttributes)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal(newAttributes.title);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.put('/roles/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    describe('Delete role DELETE: /roles/:id', () => {
      it('deletes the role', (done) => {
        request.delete(`/roles/${role.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            db.Role.count().then((count) => {
              expect(count).to.equal(1);
              done();
            });
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.delete('/roles/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });
  });

  describe('CONTEXT: without existing role', () => {
    describe('Create roles POST: /roles', () => {
      it('creates a new role', (done) => {
        request.post('/roles')
          .send({ title: 'authors' })
          .set({ Authorization: token })
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.title).to.equal('authors');
            done();
          });
      });

      it('fails for invalid role attributes', (done) => {
        const invalidParams = { name: 'role' };
        request.post('/roles')
          .send(invalidParams)
          .set({ Authorization: token })
          .expect(400, done);
      });

      it('fails if user is not an admin', (done) => {
        db.Role.create(helper.regularRole)
          .then((newRole) => {
            helper.adminUser.roleId = newRole.id;
            request.post('/users')
              .send(helper.adminUser)
              .end((err, res) => {
                request.post('/roles')
                  .set({ Authorization: res.body.token })
                  .send({ title: 'other' })
                  .expect(403, done);
              });
          });
      });
    });
  });
});
