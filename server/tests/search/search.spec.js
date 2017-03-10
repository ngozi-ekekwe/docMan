// import chai from 'chai';
// import supertest from 'supertest';
// import app from '../../../server';
// import db from '../../models';
// import helper from '../helpers/DocumentHelper';



// const request = supertest(app);
// const expect = chai.expect;
// const documentOwner = helper.documentOwner;
// const documentAdmin = helper.documentAdmin;
// const documentRegular = helper.documentRegular
// const goodDocument = helper.goodDocument;


// let token;
// const testDocument = testData.documentPublic1;

// describe('Search', () => {
//   before((done) => {
//     db.Role.create({ title: 'admin' })
//       .then(() => {
//         request.post('/api/users')
//           .send(documentOwner)
//           .end((err, res) => {
//             token = res.body.token;
//             goodDocument.ownerId = req.decoded.UserId;
//             db.Document.create(goodDocument);
//             done();
//           })
//       })
//   })
// });

// it('should return documents limited by a specified number', (done) => {
//   const searchLimit = 3;
//   request.post('/api/documents')
//     .set({ Authorization: token })
//     .send(testData.documentPublic1)
//     .end(() => {
//       request.get(`/documents/?limit=${searchLimit}`)
//         .set({ 'x-access-token': adminUserToken })
//         .end((error, response) => {
//           expect(response.status).to.equal(200);
//           expect(response.body.results.rows.length).to.equal(
//             searchLimit);
//           done();
//         });
//     });
// });

// it(
//   'should return documents ordered by published date in descending order',
//   (done) => {
//     request.get('/documents/')
//       .set({ 'x-access-token': adminUserToken })
//       .end((error, response) => {
//         expect(response.status).to.equal(200);
//         let oldestDate = Date.now();
//         response.body.results.rows.forEach((document) => {
//           const createdDate = Date.parse(document.createdAt);
//           expect(createdDate).to.be.lte(oldestDate);
//           oldestDate = createdDate;
//         });
//         done();
//       });
//   });

// it('should return only documents that match a specific query', (done) => {
//   const searchText = 'e';
//   request.get(`/documents/?search=${searchText}`)
//     .set({ 'x-access-token': adminUserToken })
//     .end((error, response) => {
//       expect(response.status).to.equal(200);
//       response.body.results.rows.forEach((document) => {
//         expect(document.title).to.contain(searchText) ||
//           expect(document.content).to.contain(searchText);
//       });
//       done();
//     });
// });
// it(
//   'should return documents limited by a specified number with result containing the search terms',
//   (done) => {
//     const searchLimit = 1;
//     const query = 'a';
//     request.get(`/documents/?search=${query}&limit=${searchLimit}`)
//       .set({ 'x-access-token': adminUserToken })
//       .end((error, response) => {
//         expect(response.status).to.equal(200);
//         response.body.results.rows.forEach((document) => {
//           expect(document.title).to.contain(query) || expect(
//             document.content).to.contain(query);
//         });
//         expect(response.body.results.rows.length).to.equal(
//           searchLimit);
//         done();
//       });
//   });
// it(
// 'should return documents limited by a specified number with result containing the search terms',
// (done) => {
//   const searchLimit = 2;
//   const query = 's' || 'i';
//   request.post('/users/login')
//     .send({
//       email: 'tests@test.com',
//       password: 'tests'
//     })
//     .end((error1, response1) => {
//       const regularToken5 = response1.body.token;
//       request.get(
//           `/documents/?search=${query}&limit=${searchLimit}`)
//         .set({ 'x-access-token': regularToken5 })
//         .end((error, response) => {
//           expect(response.status).to.equal(200);
//           response.body.results.forEach((document) => {
//             expect(document.content).to.contain(query);
//           });
//           expect(response.body.results.length).to.equal(
//             searchLimit);
//           done();
//         });
//     });
// });
// });
