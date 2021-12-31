import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {parseBlock} from '$lib/ui/block';

/* test__parseBlock */
const test__parseBlock = suite('parseBlock');

test__parseBlock.only('parses data into a Text block or not', () => {
	assert.is(parseBlock(undefined), undefined);
	assert.is(parseBlock({}), undefined);
	assert.is(parseBlock({id: '1'}), undefined);
	assert.is(parseBlock({type: 'Text'}), undefined);
	assert.is(parseBlock({content: '...'}), undefined);
	assert.is(parseBlock({id: '1', type: 'Text'}), undefined);
	assert.is(parseBlock({id: '1', content: '...'}), undefined);
	assert.is(parseBlock({type: 'Text', content: '...'}), undefined);
	assert.equal(
		parseBlock({
			id: '1',
			type: 'Text',
			content: '...',
		}),
		{
			id: '1',
			type: 'Text',
			content: '...',
		},
	);
});

// TODO maybe change this API to make `parseBlock` work on arrays?
// The reasoning to not support this is
// we don't want to pay the cost of reflection on every `parseBlock` call.
test__parseBlock('does not parse arrays', () => {
	assert.is(parseBlock([]), undefined);
	assert.is(parseBlock([{type: 'Text'}]), undefined);
});

test__parseBlock.run();
/* test__parseBlock */
