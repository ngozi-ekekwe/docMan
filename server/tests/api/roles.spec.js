import chai from 'chai';
import supertest from 'supertest';
import db from '../../models';
import app from '../../../server';
import helper from '../test-helper';

/**
 * Here is a request handler from supertest
 */
const request = supertest.agent(app);

/**
 * Grab the expect method from chai
 */
const expect = chai.expect;

/**
 * Admin and Regular users
 */
const adminUser = helper.adminUser;
const regularUser = helper.regularUser;

/**
 * Declare token variables for test
 */
let adminToken, regularToken;

describe('Role', () => {
  before((done) => {
    request.post('/users')
      .send(adminUser)
      .end((err, res) => {
        adminToken = res.body.token;
            request.post('/users')
      .send(regularUser)
      .end((err, res) => {
        regularToken = res.body.token;
        done();
      });
      });


  });

  describe('Create role', () => {
    it('Ensures an admin can create a new role', (done) => {
      request.post('/roles')
        .set({ 'x-access-token': adminToken })
        .send({ title: 'new role' })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.title).to.equal('new role');
          done();
        });
    });

    it('Should have a unique role title', (done) => {
      request.post('/roles')
        .set({ 'x-access-token': adminToken })
        .send({ title: 'new role' })
        .end((err, res) => {
          if (err) return done(err);
          expect(Array.isArray(res.body)).to.equal(true);
          expect(res.body[0].message).to.equal('title must be unique');
          done();
        });
    });

    it('Should fail for a non admin', (done) => {
      request.post('/roles')
        .set({ 'x-access-token': regularToken })
        .send({ title: 'new role' })
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          expect(typeof res.body).to.equal('object');
          expect(res.body.message).to.equal('Access forbidden, you are not an admin!');
          done();
        });
    });

    it('Should fail if a title is null', (done) => {
      request.post('/roles')
        .set({ 'x-access-token': adminToken })
        .send({ title: null })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body[0].message).to.equal('title cannot be null');
          done();
        });
    });
  });

//   describe('Get roles', () => {
//     it('Should return all roles to an admin', (done) => {
//       request.get('/roles')
//         .set({ 'x-access-token': adminToken })
//         .expect(200).end((err, res) => {
//           expect(Array.isArray(res.body)).to.equal(true);
//           expect(res.body[0].title).to.equal('admin');
//           expect(res.body[1].title).to.equal('regular');
//           done();
//         });
//     });

//     it('Should fail to return all roles to a non admin', (done) => {
//       request.get('/roles')
//         .set({ 'x-access-token': regularToken })
//         .expect(403)
//         .end((err, res) => {
//           expect(typeof res.body).to.equal('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message)
//             .to.equal('Access forbidden, you are not an admin!');
//           done();
//         });
//     });

//     it('Should return a specific role', (done) => {
//       request.get('/roles/1')
//         .set({ 'x-access-token': adminToken })
//         .expect(200).end((err, res) => {
//           expect(typeof res.body).to.equal('object');
//           expect(res.body.title).to.equal('admin');
//           expect(res.body.id).to.equal(1);
//           done();
//         });
//     });

//     it('Should fail if a role does not exist', (done) => {
//       request.get('/roles/5')
//         .set({ 'x-access-token': adminToken })
//         .expect(404).end((err, res) => {
//           expect(typeof res.body).to.equal('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message)
//             .to.equal('Role with the id: 5 does not exit');
//           done();
//         });
//     });
//   });

//   describe('Update role', () => {
//     it('Should edit and update a role', (done) => {
//       request.put('/roles/3')
//         .set({ 'x-access-token': adminToken })
//         .send({ title: 'updated role' })
//         .expect(200)
//         .end((err, res) => {
//           expect(typeof res.body).to.equal('object');
//           expect(res.body.title).to.equal('updated role');
//           expect(res.body.id).to.equal(3);
//           done();
//         });
//     });

//     it('Should fail to update a role by a non admin', (done) => {
//       request.put('/roles/3')
//         .set({ 'x-access-token': regularToken })
//         .send({ title: 'updated role' })
//         .expect(403)
//         .end((err, res) => {
//           expect(typeof res.body).to.equal('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message)
//             .to.equal('Access forbidden, you are not an admin!');
//           done();
//         });
//     });

//     it('Should fail if a role does not exist', (done) => {
//       request.put('/roles/10')
//         .set({ 'x-access-token': adminToken })
//         .send({ title: 'updated role' })
//         .expect(404)
//         .end((err, res) => {
//           expect(typeof res.body).to.equal('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message)
//             .to.equal('Cannot edit a role that does not exist');
//           done();
//         });
//     });
//   });

//   describe('Delete role', () => {
//     it('Should fail to delete a role by a non admin', (done) => {
//       request.delete('/roles/3')
//         .set({ 'x-access-token': regularToken })
//         .expect(403)
//         .end((err, res) => {
//           expect(typeof res.body).to.equal('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message)
//             .to.equal('Access forbidden, you are not an admin!');
//           done();
//         });
//     });

//     it('Should delete a role', (done) => {
//       request.delete('/roles/3')
//         .set({ 'x-access-token': adminToken })
//         .expect(200).end((err, res) => {
//           expect(typeof res.body).to.equal('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message).to.equal('Role deleted.');
//           done();
//         });
//     });

//     it('Should fail if a role does not exist', (done) => {
//       request.delete('/roles/10')
//         .set({ 'x-access-token': adminToken })
//         .expect(404).end((err, res) => {
//           expect(typeof res.body).to.equal('object');
//           expect(res.body).to.have.property('message');
//           expect(res.body.message)
//             .to.equal('Cannot delete a role that does not exist');
//           done();
//         });
//     });
//   });
});