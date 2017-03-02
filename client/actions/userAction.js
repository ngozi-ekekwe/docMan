import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';


export const createUser = (user) => {
  return {
    type: types.CREATE_USER,
    user
  }
}

//action creators
export const getUserSuccess = (users) => {
  return {
    type: types.LOAD_USER_SUCCESS,
    users
  }
}

export const updateUserSuccess = (user) => {
  return {
    type: types.UPDATE_USER_SUCCESS,
    user
  }
}

export const createUserSuccess = (users) => {
  return {
    type: types.CREATE_USER_SUCCESS,
    users
  }
}

export const currentUser = (user) => {
  return {
    type: types.CURRENT_USER,
    user
  }
}
//get roles
export const userApi = () => {
  const {token} = JSON.parse(localStorage.getItem('currentUser'));
  return fetch('/users', {
    method: 'GET',
    headers: {
      Authorization: token
    }
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((users) => {
      return users
    })
    .catch(error => {
      throw error
    })
};


export const fetchUsers = () => {
  return dispatch => {
    return userApi()
      .then(users => {
        dispatch(getUserSuccess(users))
      })
      .catch(error => { throw error; })
  }
}
export const login = (email, password) => {
  return dispatch => {
    return fetch('/users/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        dispatch(currentUser(user));
        window.location = '/';
      })
      .catch(error => {
        throw error
      });
  }
}

export const userSaver = (user) => {
  const newBody = JSON.stringify(user)
  const {token} = JSON.parse(localStorage.getItem('currentUser'));
  return fetch('/users', {
    method: 'POST',
    headers: {    
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: newBody
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((user) => {
      return user
    })
    .catch(error => {
      throw error
    });
}

export const saveUser = (userJson) => {
  return dispatch => {
    return userSaver(userJson)
      .then((savedUser) => {
        dispatch(createUserSuccess(savedUser));
      }).catch((error) => {
        throw (error);
      })
  }
}
