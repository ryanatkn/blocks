import {suite} from 'uvu';
import * as assert from 'uvu/assert';
import {toToClientId} from '@feltcoop/felt/util/id.js';

import {parseBlock} from '$lib/ui/block';

const toToId = (name = 'a') => toToClientId(name);

// TODO schemas and then check with em

/* test__parseBlock */
const test__parseBlock = suite('parseBlock');

test__parseBlock('parses data into a TextBlock or not', () => {
	assert.is(parseBlock(undefined), undefined);
	assert.is(parseBlock({}), undefined);
	assert.is(parseBlock({id: '1'}), undefined);
	assert.is(parseBlock({type: 'Text'}), undefined);
	assert.is(parseBlock({content: '...'}), undefined);
	assert.is(parseBlock({id: '1', type: 'Text'}), undefined);
	assert.is(parseBlock({id: '1', content: '...'}), undefined);
	assert.is(parseBlock({type: 'Text', content: '...'}), undefined);
	assert.equal(parseBlock({type: 'Text', content: '...'}, {toId: toToId()}), {
		id: 'a_0',
		type: 'Text',
		content: '...',
	});
	assert.equal(
		parseBlock({
			id: '1',
			type: 'Text',
			content: '...',
			extrajunk: {should: 'be removed'},
		}),
		{
			id: '1',
			type: 'Text',
			content: '...',
		},
	);
});

test__parseBlock('parses data into a ComponentBlock or not', () => {
	assert.is(parseBlock(undefined), undefined);
	assert.is(parseBlock({}), undefined);
	assert.is(parseBlock({id: '1'}), undefined);
	assert.is(parseBlock({type: 'Component'}), undefined);
	assert.is(parseBlock({component: 'ComponentA'}), undefined);
	assert.is(parseBlock({props: {a: 1, b: 2}}), undefined);
	assert.is(parseBlock({id: '1', type: 'Component'}), undefined);
	assert.is(parseBlock({id: '1', component: 'ComponentA'}), undefined);
	assert.is(parseBlock({id: '1', props: {a: 1, b: 2}}), undefined);
	assert.is(parseBlock({id: '1', type: 'Component', component: 'ComponentA'}), undefined);
	assert.is(parseBlock({id: '1', type: 'Component', props: {a: 1, b: 2}}), undefined);
	assert.is(parseBlock({id: '1', component: 'ComponentA', props: {a: 1, b: 2}}), undefined);
	assert.is(
		parseBlock({type: 'Component', component: 'ComponentA', props: {a: 1, b: 2}}),
		undefined,
	);
	assert.equal(
		parseBlock({type: 'Component', component: 'ComponentA', props: {a: 1, b: 2}}, {toId: toToId()}),
		{id: 'a_0', type: 'Component', component: 'ComponentA', props: {a: 1, b: 2}},
	);
	assert.equal(
		parseBlock({
			id: '1',
			type: 'Component',
			component: 'ComponentA',
			props: {a: 1, b: 2, shouldBeRemoved: undefined},
			extrajunk: {should: 'be removed'},
		}),
		{
			id: '1',
			type: 'Component',
			component: 'ComponentA',
			props: {a: 1, b: 2},
		},
	);
});

// TODO test children, other tags, ...

test__parseBlock('parses data into an ElementBlock or not', () => {
	assert.is(parseBlock(undefined), undefined);
	assert.is(parseBlock({}), undefined);
	assert.is(parseBlock({id: '1'}), undefined);
	assert.is(parseBlock({type: 'Element'}), undefined);
	assert.is(parseBlock({tagname: 'div'}), undefined);
	assert.is(parseBlock({attributes: {class: 'c1'}}), undefined);
	assert.is(parseBlock({id: '1', type: 'Element'}), undefined);
	assert.is(parseBlock({id: '1', tagname: 'div'}), undefined);
	assert.is(parseBlock({id: '1', attributes: {class: 'c1'}}), undefined);
	assert.is(parseBlock({id: '1', type: 'Element', tagname: 'div'}), undefined);
	assert.is(parseBlock({id: '1', type: 'Element', attributes: {class: 'c1'}}), undefined);
	assert.is(parseBlock({id: '1', tagname: 'div', attributes: {class: 'c1'}}), undefined);
	assert.is(parseBlock({type: 'Element', tagname: 'div', attributes: {class: 'c1'}}), undefined);
	assert.equal(
		parseBlock({type: 'Element', tagname: 'div', attributes: {class: 'c1'}}, {toId: toToId()}),
		{id: 'a_0', type: 'Element', tagname: 'div', attributes: {class: 'c1'}},
	);
	assert.equal(
		parseBlock({
			id: '1',
			type: 'Element',
			tagname: 'div',
			attributes: {class: 'c1', style: 'disabled_because_security_for_now', shouldBeRemoved: true},
			extrajunk: {should: 'be removed'},
		}),
		{
			id: '1',
			type: 'Element',
			tagname: 'div',
			attributes: {class: 'c1'},
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
