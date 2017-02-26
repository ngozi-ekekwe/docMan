// const app = require('../../../server');
// const expect = require('chai').expect;
// const request = require('supertest')(app);
// const db = require('../../models');
// const helper = require('../test-helper.js');

// const documentParams = helper.publicDocument;
// const userParams = helper.adminUser;

// let token

// describe('Document Api', () => {
// 	before((done) => {
// 		db.User.create(userParams)
// 			.then((newUser) => {
// 				documentParams.userId = newUser.userId
// 				request('/documents')
// 					.send(documentParams)
// 					.end((err, res) => {
// 						token = res.body.token
// 						done();
// 					})
// 			});
// 	})
	
//     describe('Get All GET: /documents', () => {
//       it('should return unauthorised for no token', (done) => {
//         request.get('/documents')
//           .end((err, res) => {
//             expect(res.status).to.equal(401);
//             done();
//           });
//       });
// })
// })