import React, { propTypes } from 'react';
import { link } from 'react-router';

const RoleListRow = ({role}) => {
    return (
        <tr>
            <td>{role.id}</td>
            <td>{role.title}</td>
            <td>{role.createdAt}</td>
            <td>{role.updatedAt}</td>
        </tr>
    )
}

export default RoleListRow;