import React, { propTypes } from 'react';

const RoleListRow = ({ role }) => {
  return (
        <tr>
            <td>{role.id}</td>
            <td>{role.title}</td>
            <td>{role.createdAt}</td>
            <td>{role.updatedAt}</td>
        </tr>
  );
};

export default RoleListRow;
