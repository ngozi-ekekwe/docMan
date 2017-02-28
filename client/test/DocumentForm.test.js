import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DocumentForm from '../components/DocumentForm';

function setup() {
    let props = {
        document: {}, errors: {},
        onSave: () => {},
        onChange: () => {}
    }
    let renderer = TestUtils.createRenderer();
    renderer.render(<DocumentForm {...props} />);
    let output = renderer.getRenderOutput();

    return {
        props,
        renderer,
        output
    }
}

describe('Document Form via React Test Utils', () => {
    it('renders a div', () => {
        const {output} = setup();
        expect(output.type).toBe('form');
    })
})
