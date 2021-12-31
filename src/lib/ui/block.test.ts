import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {parseBlock} from '$lib/ui/block';

/* test__parseBlock */
const test__parseBlock = suite('parseBlock');

test__parseBlock('parses data into a block or not', () => {
	assert.is(parseBlock(null), null);
	assert.is(parseBlock({}), null);
	assert.is(parseBlock({type: 'Text'}), null);
});

// TODO maybe change this API to make `parseBlock` work on arrays?
// The reasoning to not support this is
// we don't want to pay the cost of reflection on every `parseBlock` call.
test__parseBlock('does not parse arrays', () => {
	assert.is(parseBlock([]), null);
	assert.is(parseBlock([{type: 'Text'}]), null);
});

test__parseBlock.run();
/* test__parseBlock */
