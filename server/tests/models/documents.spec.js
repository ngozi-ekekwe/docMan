// import chai from 'chai';
// import db from '../../models';
// import  helper from  '../helpers/DocumentHelper';

// const documentOwner = helper.documentOwner;

// describe('Document Spec', () => {
//     before((done) => {
//         db.Role.create(helper.documentAdmin)
//             .then((newRole) => {
//                 documentOwner.roleId = newRole.roleId
//                 db.User.create(documentOwner)
//                     .then((newUser) => {
//                         goodDocument.ownerId = newUser.id
//                         done();
//                     })
//             })
//     })

//     after(() => db.sequelize.sync({ force: true }));

//     describe('Create new Document', () => {
//         it('should create a new document', (done) => {
//         db.Document.create(helper.goodDocument)
//             .then((newDoc) => {
//                 let document = newDoc
//                 expect(newDoc.title).to.equal(goodDocument.title)
//                 expect(newDoc.content).to.equal(goodDocument.content)
//                 done();
//             }) 
//         });

//         it('saves document with valid attributes', (done) => {
//             document.save()
//                 .then((newDocument) => {
//                 expect(newDocument.title).to.equal(document.title);
//                 expect(newDocument.content).to.equal(document.content);
//                 done();
//             })
//         });
        

//     it('sets default access to public', () =>
//       document.save()
//         .then(newDocument => expect(newDocument.access).to.equal('public'))
//         .catch(err => expect(err).to.not.exist));

//     it('has a published date defined', () =>
//       document.save()
//         .then(newDocument => expect(newDocument.createdAt).to.exist)
//         .catch(err => expect(err).to.not.exist));

//     })
// })