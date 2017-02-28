const app = require('../../../server');
const expect = require('chai').expect;
const request = require('supertest')(app);
const db = require('../../models');
const helper = require('../test-helper.js');

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

        afterEach(() => db.Document.destroy({where: {}}));

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
                request.get('documents/200')
                    .set({ Authorization: token })
                    .send(document)
                    .end((err, res) => {
                        if (err) return err
                        expect(res.status).to.equal(401);
                        done();
                    });
            });

            it('should get a particular document', (done) => {
                request.get(`documents/${document.id}`)
                    .set({ Authorization: token })
                    .send(document)
                    .end((err, res) => {
                        if (err) return err
                        expect(res.status).to.equal(200)
                        done();
                    });
            });

        })
    })
})