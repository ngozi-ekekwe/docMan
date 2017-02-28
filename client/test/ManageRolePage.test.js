import 'jsdom-global/register'
import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import { PureMyComponent } from '../containers/ManageRolePage';

describe('Role container Test via Enzyme', () => {
    describe('using shallow', () => {
        const wrapper = shallow(<PureMyComponent />)
        let childProps = wrapper.node.props.children[0].props.children[0];

        it('should have a h5 element', () => {
            expect(wrapper.node.props.children[0].type).toBe('h5');
        });

        it('should have a RoleForm componet', () => {
            expect(wrapper.find('RoleForm').length).toBeGreaterThanOrEqualTo(1);
        });
    });

    describe('mount', () => {
        const wrapper = mount(<PureMyComponent />);
    })

}) 