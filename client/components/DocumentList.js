import React, { PropTypes } from 'react';
import DocumentTitle from '../components/DocumentListTitle';
import DocumentContent from '../components/DocumentContent';


const DocumentList = ({ documents }) => {
  const dd = documents.documents;
  return (
    <div>
    {dd.map(document =>
    <div className="row" key={document.id}>
        <div className="col s6">
          <div className="card white darken-1">
            <div className="card-content black-text">
              <DocumentTitle document={document} />
              <DocumentContent document={document} />
            </div>
            <div className="card-action">
              <a href="#">{document.createdAt}</a>
            </div>
          </div>
        </div>
      </div>
      )}
      </div>
  );
};

export default DocumentList;
