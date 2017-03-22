import React, { PropTypes } from 'react';
import moment from 'moment';
import DocumentTitle from '../components/DocumentListTitle';
import DocumentContent from '../components/DocumentContent';


const DocumentList = ({ documents }) => {
  const dd = documents.doc;
  return (
    <div className="row">
    {dd.map(document =>
    <div key={document.id}>
        <div className="col s3">
          <div className="card white darken-1">
            <div className="card-content black-text">
              <DocumentTitle document={document} />
              <DocumentContent document={document} />
            </div>
            <div className="card-action">
              <a>Published: {moment(document.createdAt).format('MMMM Do YYYY')}</a>
            </div>
          </div>
        </div>
      </div>
      )}
      </div>
  );
};

export default DocumentList;
