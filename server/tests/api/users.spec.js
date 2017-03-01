const app = require('../../../server');
const expect = require('chai').expect;
const db = require('../../models/');
const request = require('supertest')(app);
const helper = require('../test-helper');

const userParams = helper.secondUser;
const roleParams = helper.adminRole;


let user, token, regularToken, newRegularRole

describe('User API', () => {
  before((done) => {
    db.Role.create(roleParams)
      .then((role) => {
        userParams.roleId = role.id;
        request.post('/users')
        .send(userParams)
        .end((err, res) => {
          user = res.body.user;
          token = res.body.token;
          done();
        });
      });
  });

  after(() => db.sequelize.sync({ force: true }));

  
    it('should return unauthorised for no token', (done) => {
      request.get('/users')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          done();
        });
    });

    it('should return a token on successful login', (done) => {
        request.post('/users/login')
          .send(userParams)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.token).to.exist;
            done();
          });
    });

    describe('Regular User', () => {
			let regularRole = {title: 'regular'};
			beforeEach((done) => {
					db.Role.create(regularRole)
							.then((newRole) => {
									newRegularRole = newRole
									helper.secondUser.roleId = newRegularRole.id
									request.post('/users')
											.send(helper.secondUser)
											.end((err, res) => {
													regularToken = res.body.token
													done();
											});
							});
			});

			afterEach(() => db.Role.destroy({where: {id: newRegularRole.id}}));

			it('should return error if user is not an admin', () => {
				request.get('/users')
					.send(helper.secondUser)
					.end((err, res) => {
						if (err) return err
						expect(res.status).to.equal(401);
					})
			})
    });


    it('should return all users', (done) => {
      request.get('/users')
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(Array.isArray(res.body)).to.be.true;
          expect(res.body.length).to.not.equal(0);
          done();
        });
    });
    
    it('should get correct user', (done) => {
      request.get(`/users/${user.id}`)
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.email).to.equal(user.email);
          done();
        });
    });

    it('should return NOT FOUND for invalid id', (done) => {
      request.get('/users/100')
        .set({ Authorization: token })
        .expect(404, done);
    });
  

    it('updates the user attributes', (done) => {
      const newAttributes = { lastname: 'Newman', email: 'newman@mail.com' };
      request.put(`/users/${user.id}`)
        .set({ Authorization: token })
        .send(newAttributes)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.lastname).to.equal(newAttributes.lastname);
          expect(res.body.email).to.equal(newAttributes.email);
          done();
        });
    });

    it('should return NOT FOUND for invalid id', (done) => {
      request.put('/users/100')
        .set({ Authorization: token })
        .expect(404, done);
    });
  
    it('deletes the user', (done) => {
      request.delete(`/users/${user.id}`)
        .set({ Authorization: token })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          db.User.count().then((count) => {
            expect(count).to.equal(0);
            done();
          });
        });
    
      it('should return NOT FOUND for invalid id', (done) => {
        request.delete('/users/100')
          .set({ Authorization: token })
          .expect(404, done);
      });
    });

    it('should fail for invalid credentials', (done) => {
      request.post('/users/login')
        .send({ email: 'fake@email.com', password: 'fakepass' })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.token).to.not.exist;
          done();
        });
    });
  
    it('logs out successfully', (done) => {
      request.post('/users/logout')
        .expect(200, done);
    });

    it('creates a new user and returns a token', (done) => {
      request.post('/users')
        .send(userParams)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.token).to.exist;
          done();
        });
    });

    it('fails if user already exist', (done) => {
      request.post('/users')
        .send(userParams)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.token).to.not.exist;
          done();
        });
    });

      it('fails for invalid user attributes', (done) => {
        const invalidParams = { firstName: 'Adam', name: 'King', email: "s@d.c" };
        request.post('/users')
          .send(invalidParams)
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.token).to.not.exist;
            done();
          });
      });
});