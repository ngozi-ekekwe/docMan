import chai from 'chai';
import db from '../../models';
import  helper from  '../helpers/DocumentHelper';

const documentOwner = helper.documentOwner;
const goodDocument = helper.goodDocument
const expect = chai.expect;


describe('Document Spec', () => {
		before((done) => {
			db.Role.create(helper.documentAdmin)
				.then((newRole) => {
					documentOwner.roleId = newRole.id
					db.User.create(documentOwner)
						.then((newUser) => {
							goodDocument.ownerId = newUser.id;
							done();
						});
				});
		});

    after(() => db.sequelize.sync({ force: true }));

    describe('Create new Document', () => {
        beforeEach((done) => {
					db.Document.create(goodDocument)
							.then((newDoc) => {
									 document = newDoc;
									done();
							}) 
        });

				afterEach(() => db.Document.destroy({where: {id: document.id}}));

        it('saves document with valid attributes', (done) => {
            document.save()
                .then((newDocument) => {
                expect(newDocument.title).to.equal(document.title);
                expect(newDocument.content).to.equal(document.content);
                done();
            })
        });
        

		it ('sets default access of public to documents', () => {
			document.save()
				.then((newDoc) => {
					expect(newDoc.access).to.equal('public')
				})
				.catch((err) => {
					expect(err).to.not.exist;
				})
		});

    it('has a published date defined', () =>
      document.save()
        .then(newDocument => expect(newDocument.createdAt).to.exist)
        .catch(err => expect(err).to.not.exist));
    });
})