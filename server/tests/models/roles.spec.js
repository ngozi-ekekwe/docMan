import chai from 'chai';
import db from '../../models';
import  helper from  '../test-helper';

const expect = chai.expect;
const roleParams = helper.role;

let role;

describe('<Unit test Role>', () => {
  before(() => {
    role = db.Role.build(roleParams)
    return db.Role.bulkCreate([helper.adminRole, helper.regularRole])
  });

  //clear database after test
  after(() => db.sequelize.sync({ force: true }));

  describe('model Role', () => {
    it('has a title property', () => {
      expect(role.title).to.equal(roleParams.title);
      expect(role.title).to.equal('author');
    });

    it('adds the new role to the Role table', () => {
      return role.save()
        .then((newRole) => expect(newRole.title).to.equal('author'));
    });

    it('has multiple roles', () => {
      return db.Role.findAll()
        .then((allRoles) => {
          expect(allRoles[0].title).to.equal('admin');
          expect(allRoles[1].title).to.equal('regular');
        });
    });

    it('creates a Role instance', () => {
      expect(role).to.exist;
    });

  });

  describe('validations', () => {
    it('should fail when a title is not passed', () => {
      db.Role.create({})
        .then((newRole) => {
          expect(newRole).to.not.exist
        }).catch((err) => {
          expect(/notNull/.test(err.message)).to.be.true
        });
    });
  })

});
