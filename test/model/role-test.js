/**
 * module dependencies
 */
const Role = require('../../models').Role;
const helper = require('../test-helper');
const chai = require('chai');

const expect = chai.expect;
const roleParams = helper.role;

//set global variables
let role;

describe('<Unit test Role>', () => {
    before(() => {
        //create an instance of the database and save
        role = Role.build(roleParams);
        return Role.bulkCreate([helper.adminRole, helper.regularRole]);

    });

    //clear database after test
    after(() => Role.sequelize.sync({force: true}));

    describe('model Role', () => {
        it('creates a Role instance', () => {
            expect(role).to.exist
        });

        it('has a title property', () => {
            expect(role.title).to.equal(roleParams.title);
            expect(role.title).to.equal('author');
        });

        it('adds the new role to the Role table', () => {
            role.save()
                .then((newRole) => expect(newRole.title).to.equal('author'));
        });

        it('has multiple roles', () => {
            Role.findAll()
                .then((roleAdded) => {
                    expect(roleAdded[0].title).to.equal('admin');
                    expect(roleAdded[1].title).to.equal('regular');
                });
        });
    });

});
