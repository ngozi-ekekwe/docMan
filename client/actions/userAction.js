import fetch from 'isomorphic-fetch';

import * as types from './actionTypes';


export const createUser = user => ({
  type: types.CREATE_USER,
  user
});

// action creators
export const getUserSuccess = (users) => {
  return {
    type: types.LOAD_USER_SUCCESS,
    users
  };
};

export const updateUserSuccess = user => ({
  type: types.UPDATE_USER_SUCCESS,
  user
});

export const createUserSuccess = users => ({
  type: types.CREATE_USER_SUCCESS,
  users
});

export const currentUser = user => ({
  type: types.CURRENT_USER,
  user
});
// get roles
export const userApi = () => {
  const { token } = JSON.parse(localStorage.getItem('currentUser'));
  return fetch('/api/users', {
    method: 'GET',
    headers: {
      Authorization: token
    }
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((users) => {
      return users;
    })
    .catch((error) => {
      throw error;
    });
};


export const fetchUsers = () => {
  console.log('got here');
  return (dispatch) => {
    return userApi()
      .then((users) => {
        console.log(users, 'fetch')
        return dispatch(getUserSuccess(users));
      })
      .catch((error) => { throw error; });
  };
};


export const login = (email, password) => dispatch => fetch('/api/users/login', {
  method: 'post',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email,
    password
  })
})
  .then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
  .then((user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    dispatch(currentUser(user));
    window.location = '/';
  })
  .catch((error) => {
    throw error;
  });

export const userSaver = (user) => {
  const newBody = JSON.stringify(user);
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: newBody
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(user => user)
    .catch((error) => {
      throw error;
    });
};

export const saveUser = userJson => dispatch => userSaver(userJson)
  .then((savedUser) => {
    dispatch(createUserSuccess(savedUser));
  }).catch((error) => {
    throw (error);
  });
