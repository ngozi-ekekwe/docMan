import chai from 'chai';
import httpMocks from 'node-mocks-http';
import UserUtils from '../../ControllerUtils/UserUtils';
import UserHelper from '../helpers/UserHelper';

const expect = chai.expect;

const req = httpMocks.createRequest({
  method: 'GET',
  url: '/api/users',
  body: {
    firstname: 'hello'
  }
});

describe('User helper methods', () => {
  it('should throw an error if the document does not exist', (done) => {
    UserUtils.validate(req).then(() => {}).catch(
      (err) => {
        expect(err.message).to.equal('Some Fields are missing');
        done();
      });
  });

  it('should return a 404 status code if the user does not exist', (
    done) => {
    UserUtils.validate(req).then(() => {}).catch(
      (err) => {
        expect(err.status).to.equal(400);
        done();
      });
  });

  it('should format document list', (done) => {
    const cleanDocument = UserUtils.userDetails(
      UserHelper.goodUser);
    expect(cleanDocument).to.have.property('firstname');
    expect(cleanDocument).to.have.property('lastname');
    expect(cleanDocument).to.have.property('username');
    done();
  });
});
