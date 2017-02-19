import * as types from '../actions/actionTypes';

export const documentApi = () => {
  return fetch('http://localhost:8000/roles')
          .then(response => {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
          })
          .then((roles) => {
            console.log(roles)
          })
          .catch(error => {
            throw error
          })
};
