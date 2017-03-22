import React, { propTypes } from 'react';
import UserListRow from './UserListRow';

function renderList(users) {
  if (!users) {
    return (
     <div className="">
      No Users
     </div>
    );
  }
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
   <tbody>
     {users.map(user =>
       <UserListRow key={user.id} user={user} />
     )}
   </tbody>
  </table>
  );
}

const UserList = ({ usersList }) => {
  const users = usersList.users;
  return renderList(users);
};

export default UserList;
