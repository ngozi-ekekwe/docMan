import fetch from 'isomorphic-fetch';
import * as types from './actionTypes';


export const createRole = role => ({
  type: types.CREATE_ROLE,
  role
});

// action creators
export const getRoleSuccess = roles => ({
  type: types.LOAD_ROLE_SUCCESS,
  roles
});

export const updateRoleSuccess = role => ({
  type: types.UPDATE_ROLE_SUCCESS,
  role
});


export const createRoleSuccess = role => ({
  type: types.CREATE_ROLE_SUCCESS,
  role
});
// get roles
export const roleApi = () => {
  const { token } = JSON.parse(localStorage.getItem('currentUser'));
  return fetch('/api/roles', {
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
    .then(roles => roles)
    .catch((error) => {
      throw error;
    });
};

export const fetchARole = roleId => fetch(`/roles/${roleId}`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(role => role)
    .catch((error) => {
      throw error;
    });

// thunk
export const fetchRoles = () => dispatch => roleApi()
      .then((roles) => {
        dispatch(getRoleSuccess(roles));
      })
      .catch((error) => { throw error; });


export const roleSaver = (role) => {
  const newBody = JSON.stringify(role);
  const { token } = JSON.parse(localStorage.getItem('currentUser'));
  return fetch('/api/roles', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: newBody
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then(role => role)
    .catch((error) => {
      throw error;
    });
};

export const saveRole = roleJson => (dispatch) => roleSaver(roleJson)
      .then((savedRole) => {
        roleJson.id ? dispatch(updateRoleSuccess(savedRole)) :
          dispatch(createRoleSuccess(savedRole));
      }).catch((error) => {
        throw (error);
      });

