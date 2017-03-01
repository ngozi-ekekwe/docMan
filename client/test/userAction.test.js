import expect from 'expect';
import * as userActions from '../actions/userAction';
import * as types from '../actions/actionTypes';
import thunk from 'redux-thunk'
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

describe('USER ACTION', () => {
    describe('createUser', () => {
        it('should create a CREATE_USER action', () => {
            const user = {firstname: 'ngozi', lastname: 'rose', username: 'rgirl', email: 'ng10@.com', password: 'hello', roleId: 1}
            const expectedAction = {
                type: types.CREATE_USER,
                user
            };
            const action = userActions.createUser(user);
            expect(action).toEqual(expectedAction);
        });
    });

});