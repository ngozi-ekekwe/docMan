import React from 'react';
import {mount, shallow} from 'enzyme';
import expect from 'expect';
import ManageRoleForm from '../containers/ManageRolePage';

describe('Manage Role Form', () => {
    it('sets error message when trying to save with empty title',  () => {
        const wrapper = mount(<ManageRoleForm />)
    })
});
