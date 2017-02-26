import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DocumentForm from '../components/DocumentForm';

function setup() {
	let props = {
		document: {}, errors: {},
		onSave: () => { },
		onChange: () => { }
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

describe('Document Form Test via React Test Utils', () => {
	const {output} = setup();
	it('renders  a form', () => {
		expect(output.type).toBe('form');
	});

	it('renders a div', () => {
		expect(output.props.children.props.children[0].type).toBe('div');
	});

	it('renders a row', () => {
		expect(output.props.children.props.className).toBe('row');
	});
})
