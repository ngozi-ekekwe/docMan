import React, { propTypes } from 'react';
import UserListRow from './UserListRow';

const UserList = ({users}) => {
    return (
        <table className="table bordered">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                </tr>
            </thead>
                {users.map(user => 
                    <RoleListRow key = {user.id} role = {users}/>
                )}
            <tbody>
            </tbody>
        </table>
    )
}

export default UserList