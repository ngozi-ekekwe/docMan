const app = require('../../../server');
const expect = require('chai').expect;
const request = require('supertest')(app);
const db = require('../../models');
const helper = require('../test-helper');


const params = helper.regularUser;
const roleParams = helper.adminRole;

let token;

describe('Authentication middleware', () => {
  before((done) => {
    db.Role.create(roleParams)
      .then((role) => {
        params.roleId = role.id;
        
        request.post('/users')
          .send(params)
          .end((err, res) => {
            token = res.body.token;
            console.log("LOGIN!!!!", res.body);
            done();
          });
      })
  });


  // clear DB after each test
  after(() => db.User.sequelize.sync({ force: true }));

  it('should return unauthorised without a token', (done) => {
    request.get('/users')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return unauthorised for invalid token', (done) => {
    request.get('/users')
      .set({ Authorization: 'invalid token' })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      });
  });

  it('should return all users for valid token', (done) => {
    request.get('/users')
      .set({ Authorization: token })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(Array.isArray(res.body)).to.be.true;
        expect(res.body.length).to.not.equal(0);
        done();
      });
  });
});