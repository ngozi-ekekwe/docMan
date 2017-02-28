import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';


export const createRole = (role) => {
  return {
    type: types.CREATE_ROLE,
    role
  }
}

//action creators
export const getRoleSuccess = (roles) => {
  return {
    type: types.LOAD_ROLE_SUCCESS,
    roles
  }
}

export const updateRoleSuccess = (role) => {
  return {
    type: types.UPDATE_ROLE_SUCCESS,
    role
  }
}


export const createRoleSuccess = (role) => {
  return {
    type: types.CREATE_ROLE_SUCCESS,
    role
  }
}
//get roles
export const roleApi = () => {
  const {token} = JSON.parse(localStorage.getItem('currentUser'));
  return fetch('/roles', {
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
    .then((roles) => {
      return roles
    })
    .catch(error => {
      throw error
    })
};

export const fetchARole = (roleId) => {
  return fetch(`/roles/${roleId}`)
    .then(response => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then((role) => {
      return role
    })
    .catch(error => {
      throw error
    })
}

//thunk
export const fetchRoles = () => {
  return dispatch => {
    return roleApi()
      .then(roles => {
        dispatch(getRoleSuccess(roles))
      })
      .catch(error => { throw error; })
  }
}


export const roleSaver = (role) => {
  const newBody = JSON.stringify(role)
  const {token} = JSON.parse(localStorage.getItem('currentUser'));
  return fetch('/roles', {
    method: 'post',
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
    .then((role) => {
      return role
    })
    .catch(error => {
      throw error
    });
}

export const saveRole = (roleJson) => {
  return (dispatch, getState) => {
    return roleSaver(roleJson)
      .then((savedRole) => {
        roleJson.id ? dispatch(updateRoleSuccess(savedRole)) :
          dispatch(createRoleSuccess(savedRole));
      }).catch((error) => {
        throw (error);
      })
  }
}


