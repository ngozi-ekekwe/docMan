import React, { propTypes } from 'react';

const DocumentTitle = ({ document }) => {
    return (
        <span className="card-title">{document.title}</span>
    );
};

export default DocumentTitle;
