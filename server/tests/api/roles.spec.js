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
        request.post('/users')
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
  })
});
