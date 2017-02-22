import React, { propTypes } from 'react';
import UserListRow from './UserListRow';

const UserList = ({users}) => {
    console.log(users)
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
                    <th>Roles</th>
                </tr>
            </thead>
                {users.map(user => 
                    <UserListRow key = {user.id} user = {user}/>
                )}
            <tbody>
            </tbody>
        </table>
    )
}

export default UserList