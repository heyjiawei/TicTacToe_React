jest.autoMockOff();

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

const App = require('../src/App').default;

describe('App', () => {
	it('Shows X when first move is made', () => {
		const rendered = TestUtils.renderIntoDocument(
			<App/>
		);

		const squares = TestUtils.scryRenderedDOMComponentsWithTag(rendered, 'td');
		const xSquare0 = squares[0];
		TestUtils.Simulate.click(xSquare0);
		
		const history = rendered.state.history;
		const current = history[history.length - 1];

		let map = Array(9).fill(null);
		map[0] = 'X';
		expect(current.values).toEqual(expect.arrayContaining(map));
	});
});