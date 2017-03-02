import React, { propTypes } from 'react';
import { link } from 'react-router';

const DocumentTitle = ({document}) => {
    return (
        <span className="card-title">{document.title}</span>
    )
}

export default DocumentTitle;
