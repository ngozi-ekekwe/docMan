import 'jsdom-global/register'
import React from 'react';
import { mount, shallow } from 'enzyme';
import expect from 'expect';
import { PureMyComponent } from '../containers/DocumentContainer';

describe('Document container Test via Enzyme', () => {

    describe('shallow components', () => {
        const wrapper = shallow(<PureMyComponent />)
        it('should have a container element', () => {
            expect(wrapper.node.props.className).toBe('container');
        });

        it('should have props for document, onChange and onSave', () => {
            let props = wrapper.node.props.children[0].props;
            expect(props.document).toBeTruthy;
            expect(props.onChange).toBeTruthy;
            expect(props.onSave).toBeTruthy;
        });

        it('should have a DocumentForm componet', () => {
            expect(wrapper.find('DocumentForm').length).toBeGreaterThanOrEqualTo(1);
        });


        it('should have a DocumentMarkdown componet', () => {
            expect(wrapper.find('DocumentMarkdown').length).toBeGreaterThanOrEqualTo(1);
        });
    });

    // describe('mount', () => {
    //     const wrapper = mount(<PureMyComponent />);
    //     console.log(wrapper)
    // })
})
