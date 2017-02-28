const app = require('../../../server');
const expect = require('chai').expect;
const request = require('supertest')(app);
const db = require('../../models');
const helper = require('../test-helper');

const userParams = helper.adminUser;
const roleParams = helper.adminRole;
const regularRole = helper.regularRole;

let role, token

describe('Roles API', () => {
  before((done) => {
    db.Role.create(roleParams)
      .then((newRole) => {
        userParams.roleId = newRole.id;
        request.post('/users')
          .send(userParams)
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      })
  });

  after(() => db.sequelize.sync({ force: true }));

  describe('Existing Role', () => {
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
      request.get('/roles')
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(401);
          done();
        })
    });

    it('should return all roles when a token is set', (done) => {
      request.get('/roles')
        .set({ Authorization: token })
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(200);
          done();
        })
    });

    it('should get a particular role when an id is passed', (done) => {
      request.get(`/roles/${role.id}`)
        .set({ Authorization: token })
        .end((err, res) => {
          if (err) return err;
          expect(res.status).to.equal(200);
          done();
        });
    });

    it('should return `Role not found`', () => {
      request.get('/roles/200')
        .end((err, res) => {
          if (err) return err
          expect(res.status).to.equal(404)
          done();
        })
    });
  })
});
