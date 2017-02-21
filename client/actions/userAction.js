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



export const login = (username, password) => {
  return fetch('http://localhost:8000/users/login', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: {
      username,
      password
    }
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((user) => {
      return user.token
    })
    .catch(error => {
      throw error
    });
}