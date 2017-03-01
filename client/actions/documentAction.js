import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';


export const createDocument = (document) => {
  return {
    type: types.CREATE_DOCUMENT,
    document
  }
}

//action creators
export const getDocumentSuccess = (document) => {
  return {
    type: types.LOAD_DOCUMENT_SUCCESS,
    document
  }
}

export const updateDocumentSuccess = (document) => {
  return {
    type: types.UPDATE_DOCUMENT_SUCCESS,
    document
  }
}

export const createDocumentSuccess = (document) => {
  return {
    type: types.CREATE_DOCUMENT_SUCCESS,
    document
  }
}
//get roles
export const documentApi = () => {
  const {token} = JSON.parse(localStorage.getItem('currentUser'));
  return fetch('http://localhost:8000/documents', {
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
    .then((documents) => {
      return document
    })
    .catch(error => {
      throw error
    })
};

export const fetchADocument = (documentId) => {
  const {token} = JSON.parse(localStorage.getItem('currentUser'));
  return fetch(`/roles/${documentId}`, {
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
    .then((document) => {
      return document
    })
    .catch(error => {
      throw error
    })
}

//thunk
export const fetchDocuments = () => {
  return dispatch => {
    return documentApi()
      .then(documents => {
        dispatch(getDocumentSuccess(documents))
      })
      .catch(error => { throw error; })
  }
}

export const documentSaver = (document) => {
  const {token} = JSON.parse(localStorage.getItem('currentUser'));
  const newBody = JSON.stringify(document)
  return fetch('/documents', {
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
    .then((document) => {
      return document
    })
    .catch(error => {
      throw error
    });
}

export const saveDocument = (documentJson) => {
  return (dispatch, getState) => {
    return documentSaver(documentJson)
      .then((savedDocument) => {
        documentJson.id ? dispatch(updateDocumentSuccess(savedDocument)) :
          dispatch(createDocumentSuccess(savedDocument));
      }).catch((error) => {
        throw (error);
      })
  }
}


