// import db from '../../models';
// import helper from '../helpers/UserHelper';
// import app from '../../../server';
// import chai from 'chai';
// import supertest from 'supertest';

// const request = supertest(app);
// const expect = chai.expect;
// const goodUser = helper.goodUser;
// const adminUser = helper.adminUser;

// let token;

// describe('User Spec', () => {
//     before(() => {
//         db.Role.create(helper.regularRole)
//     });

//     after(() => db.sequelize.sync({ force: true }));


//     describe('POST: creates a new user', () => {
//         it ('should create a new user', (done) => {
//             request.post('/users')
//                 .send(goodUser)
//                 .end((err, response) => {
//                     expect(response.status).to.equal(200);
// 										expect(response.body.message).to.eqaul('User successfully created');
// 										done();
//                 });
//         });

// 				it('does not create a bad document', (done) => {
// 					request.post('/users')
// 						.send(helper.badUser)
// 						.end((err, response) => {
// 							expect(response.status).to.equal(403);
// 							expect(response.body.message).to.equal('Some Fields are missing');
// 							done();
// 						})
// 				});

// 				// it ('does not create a user that already exists', () => {
// 				// 	request.post('/users')
// 				// 		.send(helper.duplicateUser)
// 				// 		.end((err, response) => {
// 				// 			expect(response.status).to.equal(409);
// 				// 			expect(response.body.message).to.equal('User already exists');
// 				// 		})
// 				// })
//     });

// 		describe('GET: all users',  () => {
// 			beforeEach((done) => {
// 				db.Role.create(helper.adminRole)
// 					.then((newRole) => {
// 						adminUser.roleId = newRole.id;
// 						db.User.create(adminUser)
// 							.then((newUser) => {
// 								request.post('users/login')
// 									.send(adminUser)
// 									.end((err, response) => {
// 										if (err) return err;
// 										token = response.body.token
// 										done();
// 									})

// 							});
// 					});
// 			});

// 			afterEach(() => db.User.destroy({where: {id: 2}}));

// 			it('get all users if admin', (done) => {
// 				request.get('/users')
// 					.end((err, response) => {
// 						if (err) return err;
// 						expect(response.status).to.equal(401);
// 					done();
// 					})
// 			})

// 		})
// })