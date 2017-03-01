import  app from '../../../server';
import chai from 'chai';
import supertest from 'supertest';
import db from '../../models';
import  helper from  '../test-helper';

const expect = chai.expect;
const request = supertest(app);
const documentParams = helper.publicDocument;
const userParams = helper.adminUser;
const roleDocument = helper.documentRole;

let token, document

describe('DOCUMENT SPEC', () => {
  before((done) => {
    db.Role.create(roleDocument)
      .then((newRole) => {
        userParams.roleId = newRole.id
        request.post('/users')
          .send(userParams)
          .end((err, res) => {
            if (err) return err
            token = res.body.token
            documentParams.userId = res.body.user.id;
            done();
          });
      })
  });
  after(() => db.sequelize.sync({ force: true }));

  describe('New Document', () => {
    beforeEach((done) => {
      db.Document.create(documentParams)
        .then((newDocument) => {
          document = newDocument
          done();
        });
    });

    afterEach(() => db.Document.destroy({ where: {} }));

    describe('GET: /documents', () => {
      it('should return unauthorised without a token', (done) => {
        request.get('/documents')
          .send(document)
          .end((err, res) => {
            if (err) return err
            expect(res.status).to.equal(401);
            done();
          });
      });

      it('should return all documents when a token is set', (done) => {
        request.get('/documents')
          .send(document)
          .set({ Authorization: token })
          .end((err, res) => {
            if (err) return err;
            expect(res.status).to.equal(201);
            done();
          });
      });

      it('should return NOT FOUND for invalid id', (done) => {
        request.get('/documents/200')
          .set({ Authorization: token })
          .send(document)
          .end((err, res) => {
            if (err) return err
            expect(res.status).to.equal(404);
            done();
          });
      });

      it('should get a particular document', (done) => {
        request.get(`/documents/${document.id}`)
          .set({ Authorization: token })
          .send(document)
          .end((err, res) => {
            if (err) return err
            expect(res.status).to.equal(200)
            done();
          });
      });

    });

    describe('Edit /documents/:id', () => {
      const newAttributes = { title: 'testTitle', content: 'hello world' };
      it('updates attributes in the documents', (done) => {
        request.put(`/documents/${document.id}`)
          .set({ Authorization: token })
          .send(newAttributes)
          .end((err, res) => {
            if (err) return err
            expect(res.status).to.equal(200);
            done();
          });
      });

      it('should return Document NOT FOUND', (done) => {
        request.put('/documents/200')
          .set({ Authorization: token })
          .send(newAttributes)
          .end((err, res) => {
            if (err) return err
            expect(res.status).to.equal(404);
            done();
          });
      });
    });

    describe('Delete /docuements/:id', () => {
      it('deletes a record of a document when an id is passed', (done) => {
        request.delete(`/documents/${document.id}`)
          .set({ Authorization: token })
          .end((err, res) => {
            if (err) return err
            expect(res.status).to.equal(200);
            db.Document.count().then((count) => {
              expect(count).to.equal(0);
              done();
            });
          });
      });

      it('should return Not Found', (done) => {
        request.delete('/documents/200')
          .set({ Authorization: token })
          .end((err, res) => {
            if (err) return err
            expect(res.status).to.equal(404);
            done();
          });
      })
    });
  });
});
