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


export const createUserSuccess = (role) => {
  return {
    type: types.CREATE_USER_SUCCESS,
    role
  }
}
//get roles
export const userApi = () => {
  return fetch('http://localhost:8000/users')
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((roles) => {
      return roles
    })
    .catch(error => {
      throw error
    })
};

<<<<<<< HEAD


export const login = (username, password) => {
  return fetch('http://localhost:8000/users/login', {
=======
export const fetchAUser = (userId) => {
  return fetch(`http://localhost:8000/users/${userId}`)
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
    })
}

//thunk
export const fetchUsers = () => {
  return dispatch => {
    return userApi()
      .then(users => {
        dispatch(getUserSuccess(users))
      })
      .catch(error => { throw error; })
  }
}


export const userSaver = (user) => {
  const newBody = JSON.stringify(user)
  return fetch('http://localhost:8000/users', {
>>>>>>> b8e37518ada28e571e469b3f4974134b9209a5e9
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
<<<<<<< HEAD
    body: {
      username,
      password
    }
=======
    body: newBody
>>>>>>> b8e37518ada28e571e469b3f4974134b9209a5e9
  })
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((user) => {
<<<<<<< HEAD
      return user.token
=======
      return user
>>>>>>> b8e37518ada28e571e469b3f4974134b9209a5e9
    })
    .catch(error => {
      throw error
    });
<<<<<<< HEAD
}

}

export const saveUser = (userJson) => {
  return (dispatch, getState) => {
    return userSaver(userJson)
      .then((savedUser) => {
        userJson.id ? dispatch(updateUserSuccess(savedUser)) :
          dispatch(createUserSuccess(savedUser));
      }).catch((error) => {
        throw (error);
      })
  }
}
