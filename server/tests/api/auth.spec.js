const app = require('../../../server');
const expect = require('chai').expect;
const request = require('supertest')(app);
const db = require('../../models');
const helper = require('../test-helper');


const params = helper.regularUser;
const roleParams = helper.adminRole;

let token;

describe('Authentication middleware', () => {
  before(() => {
    db.Role.create(roleParams)
      .then((role) => {
        params.roleId = role.id;
         return db.User.create(params);
      }).then(() => {
        request.post('/users/login')
          .send(params)
          .end((err, res) => {
            token = res.body.token;
            return;
          });
      });
  });

  after(() => db.User.sequelize.sync({ force: true }));

  it('Unauthorized access', (done) => {
    request.get('/users')
      .end((err, res) => {
          
        expect(res.status).to.equal(401);
        done();
      })
  });
});