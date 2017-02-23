import React, { propTypes } from 'react';
import { link } from 'react-router';

const DocumentListRow = ({document}) => {
    return (
        <tr>
            <td>{document.id}</td>
            <td>{document.title}</td>
            <td>{document.content}</td>
            <td>{document.access}</td>
            <td>{document.userId}</td>
        </tr>
    )
}

export default DocumentListRow;