import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {parseBlock} from '$lib/ui/block';

/* test__parseBlock */
const test__parseBlock = suite('parseBlock');

test__parseBlock('basic behavior', () => {
	assert.is(parseBlock(null), null);
	assert.is(parseBlock({}), null);
	assert.is(parseBlock({type: 'Text'}), null);
});

test__parseBlock.run();
/* test__parseBlock */
