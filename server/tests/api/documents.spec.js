import DocumentHelper from '../helpers/DocumentHelper';
import db  from '../../models';
import app from '../../../server';
import chai from 'chai';
import supertest from 'supertest';

const userParams = DocumentHelper.documentOwner;
const adminRole = DocumentHelper.documentAdmin;
const regularRole = DocumentHelper. documentRegular;
const goodDocument = DocumentHelper.goodDocument;
const privateUser = DocumentHelper.privateUser;
const privateDocument = DocumentHelper.privateDocument;
const request = supertest(app);
const expect = chai.expect;

let token, privateToken, doc, documentresponse, getDoc;


describe('Document SPEC', () => {
	before((done) => {
		db.Role.create(adminRole)
			.then(newRole => {
					userParams.roleId = newRole.id
					db.User.create(userParams)
						.then((newUser) => {
							request.post('/api/users/login')
								.send(userParams)
								.end((err, response) => {
									if (err) return err;
									token = response.body.token;
									goodDocument.ownerId = response.body.UserId;
									done();
								});
						});
				});
	});

    after(() => db.sequelize.sync({ force: true }));

    describe('Create document', () => {
			beforeEach((done) => {
				request.post('/api/documents')
					.send(goodDocument)
					.set({Authorization: token})
					.end((err, res) => {
						if (err) return err
						 documentresponse = res
						done();
					});
			})

			afterEach(() => db.Document.destroy({where: {}}));

			it ('creates a new document when token is valid', (done) => {
					expect(documentresponse.status).to.equal(200);
					expect(documentresponse.body.document).to.have.property('title');
					expect(documentresponse.body.document).to.have.property('content');
					expect(documentresponse.body.message).to.equal('Document successfully created')
					done();
			});

			it('should have the date of creation defined', () => {
				expect(documentresponse.body.document).to.have.property('published');
			})

			it ('should not create a document with missing fields', (done) => {
				request.post('/api/documents')
					.send(DocumentHelper.badDocument)
					.set({Authorization: token})
					.end((err, res) => {
						if (err) return err;
						expect(res.status).to.equal(403)
						expect(res.body.message).to.equal('Some Fields are missing');
						done();
					});
			});

			it ('should not create the document if it already exists', (done) => {
				request.post('/api/documents')
					.send(goodDocument)
					.set({Authorization: token})
					.end((err, response) => {
						if (err) return err;
						expect(response.status).to.equal(409);
						expect(response.body.message).to.equal('Document with title already exists');
						done();
					})
			})
    })

		describe('GET: /documents', () => {

			before((done) => {
				request.post('/api/documents')
					.send(goodDocument)
					.set({Authorization: token})
					.end((err, res) => {
						if (err) return err;
						getDoc = res.body
						done();
					})
			})
			it ('should not return a document to an unauthorized user', (done) => {
				request.get('/api/documents')
					.end((err, res) => {
						if (err) return err;
						expect(res.status).to.equal(401);
						expect(res.body.message).to.equal('Token required to access this route');
						done();
					});
			});

			it ('should return all documents to the admin alone', (done) => {
				request.get('/api/documents')
					.set({Authorization: token})
					.end((err, res) => {
						expect(res.status).to.equal(200);
						expect(res.body.documents).to.exist;
						done();
					});
			});

			describe ('should return documents from the most recent', () => {
				beforeEach((done) => {
				request.post('/api/documents')
					.send(DocumentHelper.goodDocument2)
					.set({Authorization: token})
					.end((err, res) => {
						expect(res.status).to.equal(200);
						done();
					})
				});

				it ('should return documents from the most recent', (done) => {
					request.get('/api/documents')
					.set({Authorization: token})
					.end((err, res) => {
						if (err) return err
						expect(res.body.documents[0].createdAt)
							.to.be.greaterThan(res.body.documents[1].createdAt)
							done();
					})
				});
			})  

			it ('paginates the list of documents', (done) => {
				request.get('/api/documents')
					.set({Authorization: token})
					.end((err, response) => {
						expect(response.status).to.equal(200);
						expect(response.body.pagination).to.exist
						done();
					});
			});

			it ('returns null for `page` when a limit is not set', (done) => {
				request.get('/api/documents')
					.set({Authorization: token})
					.end((err, response) => {
						expect(response.body.pagination.page).to.equal(null);
						done();
					});
			});

			it ('return `0` for page_count when offset is not set', (done) => {
				request.get('/api/documents')
					.set({Authorization: token})
					.end((err, response) => {
						expect(response.body.pagination.page_count).to.equal(0);
						done();
					});
			});

			it ('should return 404 if a document does not exists', (done) => {
				request.get('/api/documents/10')
					.set({Authorization: token})
					.end((err, response) => {
						expect(response.status).to.equal(404);
						done();
					});
			});

		});

		describe('GET: /documents/:id', () => {
			before((done) => {
				db.Role.create(regularRole)
					.then((newRole) => {
						privateUser.roleId = newRole.id;
						db.User.create(privateUser)
							.then((newUser) => {
								request.post('/api/users/login')
									.send(privateUser)
									.end((err, response) => {
										if (err) return err;
										privateToken = response.body.token;
										privateDocument.ownerId = response.body.UserId;
										done();
									})
							});
					});
			});

			beforeEach((done) => {
				db.Document.create(privateDocument)
					.then((newDoc) => {
						doc = newDoc.dataValues;
						done();
					});
			});

			afterEach(() => db.Document.destroy({where: {id: doc.id}}));

			it ('returns a private document only to the owner', (done) => {
				request.get(`/api/documents/${doc.id}`)
					.set({Authorization: token})
					.end((err, response) => {
						expect(response.status).to.equal(403);
						expect(response.body.message).to.equal('This Document is Private');
						done();
					});
			});


			it ('returns a private document only to the owner', (done) => {
				request.get(`/api/documents/${doc.id}`)
					.set({Authorization: privateToken})
					.end((err, response) => {
						if (err) return err;
						expect(response.status).to.equal(200);
						done();
					});
			});

			describe('Delete', () => {
				it('should only allow a user delete his own document', (done) => {
					request.delete(`/api/documents/${doc.id}`)
						.set({Authorization: token})
						.end((err, response) => {
							if (err) return err;
							expect(response.status).equal(403);
							done();
						});
				});

				it('should only allow a user delete his own document', (done) => {
					request.delete(`/api/documents/${doc.id}`)
						.set({Authorization: privateToken})
						.end((err, response) => {
							if (err) return err;
							expect(response.status).equal(200);
							done();
						});
				});

				it('should only allow a user delete his own record', (done) => {
					request.delete(`/api/documents/100`)
						.set({Authorization: privateToken})
						.end((err, response) => {
							if (err) return err;
							expect(response.status).equal(404);
							done();
						});
				});
			});

			describe('update', () => {
				it('should only allow a user delete his own record', (done) => {
					request.put(`/api/documents/${doc.id}`)
						.send(DocumentHelper.updateDocument)
						.set({Authorization: token})
						.end((err, response) => {
							if (err) return err;
							expect(response.status).equal(403);
							done();
						});
				});

				it('should only allow a user update his own record', (done) => {
					request.put('/api/documents/200')
						.send(DocumentHelper.updateDocument)
						.set({Authorization: privateToken})
						.end((err, response) => {
							if (err) return err;
							expect(response.status).equal(404);
							done();
						});
				});
			})
		});
})