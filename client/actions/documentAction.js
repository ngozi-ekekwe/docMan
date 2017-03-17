import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';


export const createDocument = document => ({
  type: types.CREATE_DOCUMENT,
  document
});

// action creators
export const getDocumentSuccess = documents => ({
  type: types.LOAD_DOCUMENT_SUCCESS,
  documents
});

export const updateDocumentSuccess = document => ({
  type: types.UPDATE_DOCUMENT_SUCCESS,
  document
});

export const createDocumentSuccess = document => ({
  type: types.CREATE_DOCUMENT_SUCCESS,
  document
});
// get roles
export const documentApi = () => {
  const { token } = JSON.parse(localStorage.getItem('currentUser'));
  return fetch('/api/documents', {
    method: 'GET',
    headers: {
      Authorization: token
    }
  }).then((response) => {
    if (response.status >= 400) {
      throw new Error('Bad response from server');
    }
    return response.json();
  })
    .then(documents => documents)
    .catch((error) => {
      throw error;
    });
};

export const fetchADocument = (documentId) => {
  const { token } = JSON.parse(localStorage.getItem('currentUser'));
  return fetch(`/api/roles/${documentId}`, {
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
    .then(document => document)
    .catch((error) => {
      throw error;
    });
};

// thunk
export const fetchDocuments = () => dispatch => documentApi()
      .then((documents) => {
        dispatch(getDocumentSuccess(documents));
      })
      .catch((error) => { throw error; });

export const documentSaver = (document) => {
  const { token } = JSON.parse(localStorage.getItem('currentUser'));
  const newBody = JSON.stringify(document);
  return fetch('/api/documents', {
    method: 'POST',
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
    .then(document => document)
    .catch((error) => {
      throw error;
    });
};

export const saveDocument = documentJson => dispatch => 
documentSaver(documentJson)
      .then((savedDocument) => {
        documentJson.id ? dispatch(updateDocumentSuccess(savedDocument)) :
          dispatch(createDocumentSuccess(savedDocument));
      }).catch((error) => {
        throw (error);
      });

