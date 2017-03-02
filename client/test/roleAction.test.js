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
