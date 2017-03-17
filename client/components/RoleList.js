import React, { propTypes } from 'react';
import RoleListRow from './RoleListRow';

const RoleList = ({ roles }) => (
        <table className="table bordered">
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>Title</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                </tr>
            </thead>
                {roles.map(role =>
                    <RoleListRow key = {role.id} role = {role}/>
                )}
            <tbody>
            </tbody>
        </table>
    );

export default RoleList;
