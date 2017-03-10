import chai from 'chai';
import db from '../../models';
import helper from '../test-helper';

const expect = chai.expect;
const userParams = helper.regularUser;
const roleParams = helper.regularRole;

const notNullAttrs = [
  'firstname',
  'lastname',
  'username',
  'email',
  'password',
  'roleId'
];

let user;

describe('User Model', () => {
  before((done) => {
    db.Role.create(roleParams)
      .then((newRole) => {
        userParams.roleId = newRole.id;
        db.User.create(userParams)
          .then((newUser) => {
            user = newUser;
            done();
          });
      });
  });

  after(() => db.sequelize.sync({ force: true }));

  describe('Create User', () => {
    it('has valid properties', () => {
      expect(user.firstname).to.equal(userParams.firstname);
      expect(user.lastname).to.equal(userParams.lastname);
      expect(user.username).to.equal(userParams.username);
      expect(user.email).to.equal(userParams.email);
    });

    it('saves user with valid attributes', () => {
      user.save().then((savedUser) => {
        expect(savedUser.firstname).to.equal(user.firstname);
        expect(savedUser.lastname).to.equal(user.lastname);
        expect(savedUser.username).to.equal(user.username);
      });
    });

    it('creates password and encrypts it', () => {
      user.save().then((savedUser) => {
        expect(savedUser.password).to.not.equal(userParams.password);
      });
    });
  });

  describe('Update User', () => {
    it('hashes updated passwords', () => {
      user.save()
        .then(newUser => newUser.update({ password: 'validpassword' }))
        .then((updatedUser) => {
          expect(updatedUser.password).to.not.equal(
            'validpassword');
        });
    });
  });

  describe('Validations', () => {
    describe('NOT NULL attributes', () => {
      notNullAttrs.forEach((attr) => {
        it(`fails without ${attr}`, () => {
          user[attr] = null;
          return user.save()
            .then(newUser => expect(newUser).to.not.exist)
            .catch(err =>
              expect(/notNull/.test(err.message)).to.be.true
            );
        });
      });
    });
  });
});
