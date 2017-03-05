import DocumentHelper from '../helpers/DocumentHelper';
import db  from '../../models';
import app from '../../../server';
import chai from 'chai';
import supertest from 'supertest';

const userParams = DocumentHelper.documentOwner;
const adminRole = DocumentHelper.documentAdmin;
const regularRole = DocumentHelper. documentRegular;
const goodDocument = DocumentHelper.goodDocument;
const request = supertest(app);
const expect = chai.expect;

let token;


describe('Document SPEC', () => {
    before((done) => {
        db.Role.create(regularRole)
            .then(newRole => {
                userParams.roleId = newRole.id
                request.post('/users')
                    .send(userParams)
                    .end((err, response) => {
                        if (err) return err;
                        token = response.body.token
												console.log(response.body, '=========================================>')
                
                        done();
                    });
            });
    });

    after(() => db.sequelize.sync({ force: true }));

    describe('New Document', () => {
        it ('creates a new document successfully', (done) => {
					console.log(goodDocument, '.........................................')
            request.post('/documents')
                .send(goodDocument)
                .set({Authorization: token})
                .end((err, response) => {
                    if (err) return err;
                    expect(response.status).to.equal(200);
										done();
                })
        })
    })
})