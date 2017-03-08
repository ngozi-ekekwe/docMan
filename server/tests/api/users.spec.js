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
//     before((done) => {
//         db.Role.create(helper.adminRole)
//             .then((newRole) => {
//                 goodUser.roleId = newRole.roleId;
//                 done();
//             });

//     });

//     after(() => db.sequelize.sync({force: true}));

//     describe('New User', () => {

// 			afterEach(() => db.User.destroy({where: {}}));

// 			it('creates a new User', (done) => {
// 					request.post('/users')
// 						.send(goodUser)
// 						.end((err, response) => {
// 							if (err) return err;
// 							expect(response.status).to.equal(200);
// 							done();
// 					});
// 			});
// 	});




// })