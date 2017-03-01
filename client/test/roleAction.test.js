import expect from 'expect';
import * as roleActions from '../actions/roleAction';
import * as types from '../actions/actionTypes';
import thunk from 'redux-thunk'
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('ROLE ACTION', () => {
    describe('createRole', () => {
        it('should create a CREATE_ROLE action', () => {
            const role = {title: 'admin'}
            const expectedAction = {
                type: types.CREATE_ROLE,
                role
            };
            const action = roleActions.createRole(role);
            expect(action).toEqual(expectedAction);
        });
    });

});

const middleware =  [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Action', () => {
    afterEach(() => {
        nock.cleanAll();
    });

    it('should create ajax call and load roles when loading roles', (done) => {
        nock('http://localhost:8000/')
            .get('/roles')
            .reply(200, {body: {role: [{title: 'admin'}  ] } });
            
        const expectedActions = [
            {type: types.LOAD_ROLE_SUCCESS, body: [{roles: {title: 'admin'}}]}
        ]
        const store = mockStore(roles: [], expectedActions);
        store.dispatch(roleActions.fetchRoles()).then(() => {
            const actions = store.getActions();
            expect(actions[0].type).toEqual(types.LOAD_ROLE_SUCCESS);
            done();
        })
    });
})