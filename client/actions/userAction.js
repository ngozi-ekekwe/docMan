import * as types from '../actions/actionTypes';
import fetch from 'isomorphic-fetch';

export const UserApi = () => {
  return fetch('http://localhost:8000/users')
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((user) => {
      console.log(user)
    })
    .catch(error => {
      throw error
    })
};

export const createDocument = (document) => {
  return {type: types.CREATE_DOCUMENT, document}
}