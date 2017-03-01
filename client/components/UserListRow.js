import React, { propTypes } from 'react';
import { link } from 'react-router';

const UserListRow = ({user}) => {
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>{user.roleId}</td>
        </tr>
    )
}

export default UserListRow;