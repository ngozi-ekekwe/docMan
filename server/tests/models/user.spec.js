//module dependencies 
const chai = require('chai');
const db = require('../../models');
const helper = require('../test-helper');

const expect = chai.expect;

//global
let user;

describe('<Unit test>', () => {
    before(() => {
        db.Role.create(helper.regularRole)
            .then((role) => {
                helper.regularUser.roleId = role.id;
            });
    });

    beforeEach(() => {
        user = db.User.build(helper.regularUser);
    });

    after(() => {
        db.sequelize.sync({force: true});
    });

    afterEach(() => {
        db.User.destroy({where: {}})

    });

    describe('model User', () => {
        it('creates a User instance', () => {
            expect(user).to.exist
        });

        it('has valid attributes', () => {
            expect(user.firstname).to.equal(helper.regularUser.firstname);
            expect(user.lastname).to.equal(helper.regularUser.lastname);
            expect(user.username).to.equal(helper.regularUser.username);
            expect(user.email).to.equal(helper.regularUser.email);
            expect(user.roleId).to.equal(helper.regularUser.roleId);
        });
    });

    describe('Method save', () => {
        it('should save to the database', () => {
            user.save()
            .then((newUser) => {
                expect(newUser.firstname).to.equal(helper.regularUser.firstname);
            });
        });

        it('should save without errors', () => {

        });
    });

});