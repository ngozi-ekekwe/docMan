import chai from 'chai';
import httpMocks from 'node-mocks-http';
import DocumentUtils from '../../ControllerUtils/DocumentUtils';
import DocumentHelper from '../helpers/DocumentHelper';

const expect = chai.expect;

const req = httpMocks.createRequest({
  method: 'GET',
  url: '/api/users',
  body: {
    title: 'hello'
  }
});

describe('Document helper methods', () => {
  it('should throw an error if the document does not exist', (done) => {
    DocumentUtils.validate(req).then(() => {}).catch(
      (err) => {
        expect(err.message).to.equal('Some Fields are missing');
        done();
      });
  });

  it('should return a 404 status code if the document does not exist', (
    done) => {
    DocumentUtils.validate(req).then(() => {}).catch(
      (err) => {
        expect(err.status).to.equal(403);
        done();
      });
  });

  it('should format document list', (done) => {
    const cleanDocument = DocumentUtils.formatDocumentList(
      DocumentHelper.goodDocument);
    expect(cleanDocument).to.have.property('content');
    expect(cleanDocument).to.have.property('title');
    expect(cleanDocument).to.have.property('access');
    done();
  });
});
