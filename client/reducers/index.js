import { combineReducers } from 'redux';
import roles from './roleReducer';
import users from './userReducer';
import documents from './documentReducer';

const rootReducer = combineReducers({
  roles,
  users,
  documents
});

export default rootReducer;
