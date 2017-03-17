import React, { propTypes } from 'react';
import { link } from 'react-router';

const DocumentContent = ({document}) => {
    return (
        <p>
          {document.content}
        </p>
    );
};

export default DocumentContent;


