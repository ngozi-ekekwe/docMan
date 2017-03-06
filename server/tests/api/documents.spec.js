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

let token, privateToken, doc;


describe('Document SPEC', () => {
	before((done) => {
		db.Role.create(adminRole)
			.then(newRole => {
					userParams.roleId = newRole.id
					db.User.create(userParams)
						.then((newUser) => {
							request.post('/users/login')
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

    describe('POST: New Document', () => {
			it ('creates a new document successfully', (done) => {
				request.post('/documents')
						.send(goodDocument)
						.set({Authorization: token})
						.end((err, response) => {
								if (err) return err;
								expect(response.status).to.equal(200);
								expect(response.body.message).to.equal('Document successfully created');
								done();
						});
			});

			it ('does not create a document with missing fields', (done) => {
				request.post('/documents')
					.send(DocumentHelper.badDocument)
					.set({Authorization: token})
					.end((err, response) => {
						if (err) return err;
						expect(response.status).to.equal(403)
						expect(response.body.message).to.equal('Some Fields are missing');
						done();
					});
			});

			it ('does not create if the document already exists', (done) => {
				request.post('/documents')
					.send(DocumentHelper.existingDocument)
					.set({Authorization: token})
					.end((err, response) => {
						if (err) return err;
						expect(response.status).to.equal(409);
						expect(response.body.message).to.equal('Document already exists');
						done();
					})
			})
    })

		describe('GET: /documents', () => {
			it ('ensures a regular user can  not views all documents', (done) => {
				request.get('/documents')
					.end((err, response) => {
						if (err) return err;
						expect(response.status).to.equal(401);
						expect(response.body.message).to.equal('Token required to access this route');
						done();
					});
			});

			it ('allows an admin user view all documents', (done) => {
				request.get('/documents')
					.set({Authorization: token})
					.end((err, response) => {
						expect(response.status).to.equal(200);
						done();
					});
			});

			it ('paginates the list of documents', (done) => {
				request.get('/documents')
					.set({Authorization: token})
					.end((err, response) => {
						expect(response.status).to.equal(200);
						expect(response.body.pagination).to.exist
						done();
					});
			});

			it ('returns null for `page` when a limit is not set', (done) => {
				request.get('/documents')
					.set({Authorization: token})
					.end((err, response) => {
						expect(response.body.pagination.page).to.equal(null);
						done();
					});
			});

			it ('return `0` for page_count when offset is not set', (done) => {
				request.get('/documents')
					.set({Authorization: token})
					.end((err, response) => {
						expect(response.body.pagination.page_count).to.equal(0);
						done();
					});
			});

			it ('should return 404 if a document does not exists', (done) => {
				request.get('/documents/10')
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
								request.post('/users/login')
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
				request.get(`/documents/${doc.id}`)
					.set({Authorization: token})
					.end((err, response) => {
						expect(response.status).to.equal(403);
						expect(response.body.message).to.equal('This Document is Private');
						done();
					});
			});


			it ('returns a private document only to the owner', (done) => {
				request.get(`/documents/${doc.id}`)
					.set({Authorization: privateToken})
					.end((err, response) => {
						if (err) return err;
						expect(response.status).to.equal(200);
						done();
					});
			});

			describe('Delete', () => {
				it('should only allow a user delete his own record', (done) => {
					request.delete(`/documents/${doc.id}`)
						.set({Authorization: token})
						.end((err, response) => {
							if (err) return err;
							expect(response.status).equal(403);
							done();
						});
				});

				it('should only allow a user delete his own record', (done) => {
					request.delete(`/documents/${doc.id}`)
						.set({Authorization: privateToken})
						.end((err, response) => {
							if (err) return err;
							expect(response.status).equal(200);
							done();
						});
				});

				it('should only allow a user delete his own record', (done) => {
					request.delete(`/documents/100`)
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
					request.put(`/documents/${doc.id}`)
						.send(DocumentHelper.updateDocument)
						.set({Authorization: token})
						.end((err, response) => {
							if (err) return err;
							expect(response.status).equal(403);
							done();
						});
				});

				it('should only allow a user update his own record', (done) => {
					request.put('/documents/200')
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