import  * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function documentReducer(state = initialState.roles, action) {
  switch(action.type) {
    case types.CREATE_ROLsE:
      return action.role;
    case types.LOAD_ROLE:
      return [...state, action.role]
    default:
      return state;
  }
}