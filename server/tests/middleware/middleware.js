/* eslint-disable no-unused-expressions */
import 'babel-polyfill';
import httpMocks from 'node-mocks-http';
import chai from 'chai';
import sinon from 'sinon';
import events from 'events';
import supertest from 'supertest';
import app from '../../../server';
import helper from '../helpers/DocumentHelper';
import authentication from '../../middlewares/Authentication';
import db from '../../models';

const expect = chai.expect;
const request = supertest(app);
const userParams = helper.documentOwner;
const adminRole = helper.documentAdmin;
const next = () => true;
const createResponse = () => httpMocks
  .createResponse({ eventEmitter: events.EventEmitter });
let token;

describe('Middleware Test', () => {
  before((done) => {
    db.Role.create(adminRole)
      .then((newRole) => {
        userParams.roleId = newRole.id;
        db.Role.create({ title: 'regular' });
        db.User.create(userParams)
          .then(() => {
            request.post('/api/users/login')
              .send(userParams)
              .end((err, response) => {
                if (err) return err;
                token = response.body.token;
                done();
              });
          });
      });
  });

  after(() => db.sequelize.sync({ force: true }));

  describe('verifyToken', () => {
    it('returns an error if token is not passed', (done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
      });
      res.on('end', () => {
        expect(res._getData().message).to.equal(
          'Token required to access this route');
        done();
      });
      authentication.verifyToken(req, res);
    });

    it('returns an error if a wrong token is passed', (done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        headers: { 'x-access-token': 'thiscanneverbeavalidbase-64code' }
      });
      authentication.verifyToken(req, res);
      res.on('end', () => {
        expect(res._getData().message).to.equal('Invalid token');
        done();
      });
    });

    it('calls the next function if the token is valid', (done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/login',
        headers: { Authorization: token }
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.verifyToken(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('should not call next function if the token is not passed', (
      done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'POST',
        url: '/api/users/login',
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.verifyToken(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });

  describe('validateAdmin', () => {
    it('returns an error if user is not an admin', (done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        decoded: {
          RoleId: 2
        }
      });
      res.on('end', () => {
        expect(res._getData().message).to.equal(
          'Token required to access this route');
        done();
      });
      authentication.verifyToken(req, res);
    });

    it('calls the next function if the user is an admin', (done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        headers: { Authorization: token },
        decoded: {
          RoleId: 1
        }
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.validateAdmin(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).to.have.been.called;
      done();
    });

    it('should not call next function if the user is not an admin', (
      done) => {
      const res = createResponse();
      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/api/users',
        decoded: {
          RoleId: 2
        }
      });
      const middlewareStub = {
        callback: () => {}
      };

      sinon.spy(middlewareStub, 'callback');
      authentication.validateAdmin(req, res, middlewareStub.callback);
      expect(middlewareStub.callback).not.to.have.been.called;
      done();
    });
  });
});
