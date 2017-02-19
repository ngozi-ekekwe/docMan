/**
 * module dependencies
 */
const Role = require('../../server/models').Role;
const helper = require('../test-helper');
const chai = require('chai');
const expect = chai.expect;
const roleParams = helper.role;

//set global variables
let role;

describe('<Unit test Role>', () => {
    before(() => {
        //create an instance of the database and save
        role = Role.build(roleParams)
        return Role.bulkCreate([helper.adminRole, helper.regularRole])
    });

    //clear database after test
    after(() => Role.sequelize.sync({ force: true }));

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
            return Role.findAll()
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
            Role.create({})
                .then((newRole) => {
                    expect (newRole).to.not.exist
                })
        });
    })

});
