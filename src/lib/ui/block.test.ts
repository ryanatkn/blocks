import {suite} from 'uvu';
import * as assert from 'uvu/assert';
import {toToClientId} from '@feltcoop/felt/util/id.js';

import {parseBlock, parseBlocks, type ParseBlockOptions} from '$lib/ui/block';
import {components} from '$lib/app/componentsTestHack';
import {elements} from '$lib/app/elements';
import {events} from '$lib/app/events';

// TODO do this automatically
import {install} from 'source-map-support';
install();

const toToId = (name = 'a') => toToClientId(name);

const toOptions = (): ParseBlockOptions => ({
	toId: toToId(),
	components,
	elements,
	events,
});

const toOptionsWithoutId = () => ({
	...toOptions(),
	toId: undefined,
});

const TEST_COMPONENT_NAME = Array.from(components.keys())[0];

// TODO schemas and then check with em

/* test__parseBlock */
const test__parseBlock = suite('parseBlock');

test__parseBlock('parses data into a TextBlock or not', () => {
	assert.is(parseBlock(undefined, toOptions()), undefined);
	assert.is(parseBlock({}, toOptions()), undefined);
	assert.is(parseBlock({id: '1'}, toOptions()), undefined);
	assert.is(parseBlock({type: 'Text'}, toOptions()), undefined);
	assert.is(parseBlock({content: '...'}, toOptions()), undefined);
	assert.is(parseBlock({id: '1', type: 'Text'}, toOptions()), undefined);
	assert.is(parseBlock({id: '1', content: '...'}, toOptions()), undefined);
	assert.is(parseBlock({type: 'Text', content: '...'}, toOptionsWithoutId()), undefined);
	assert.equal(parseBlock({type: 'Text', content: '...'}, toOptions()), {
		id: 'a_0',
		type: 'Text',
		content: '...',
	});
	assert.equal(
		parseBlock(
			{
				id: '1',
				type: 'Text',
				content: '...',
				extrajunk: {should: 'be removed'},
			},
			toOptions(),
		),
		{
			id: '1',
			type: 'Text',
			content: '...',
		},
	);
});

test__parseBlock('parses data into a ComponentBlock or not', () => {
	assert.is(parseBlock(undefined, toOptions()), undefined);
	assert.is(parseBlock({}, toOptions()), undefined);
	assert.is(parseBlock({id: '1'}, toOptions()), undefined);
	assert.is(parseBlock({type: 'Component'}, toOptions()), undefined);
	assert.is(parseBlock({component: TEST_COMPONENT_NAME}, toOptions()), undefined);
	assert.is(parseBlock({props: {a: 1, b: 2}}, toOptions()), undefined);
	assert.is(parseBlock({id: '1', type: 'Component'}, toOptions()), undefined);
	assert.is(parseBlock({id: '1', component: TEST_COMPONENT_NAME}, toOptions()), undefined);
	assert.is(parseBlock({id: '1', props: {a: 1, b: 2}}, toOptions()), undefined);
	assert.is(
		parseBlock({id: '1', type: 'Component', component: TEST_COMPONENT_NAME}, toOptions()),
		undefined,
	);
	assert.is(parseBlock({id: '1', type: 'Component', props: {a: 1, b: 2}}, toOptions()), undefined);
	assert.is(
		parseBlock({id: '1', component: TEST_COMPONENT_NAME, props: {a: 1, b: 2}}, toOptions()),
		undefined,
	);
	assert.is(
		parseBlock(
			{type: 'Component', component: TEST_COMPONENT_NAME, props: {a: 1, b: 2}},
			toOptionsWithoutId(),
		),
		undefined,
	);
	assert.equal(
		parseBlock(
			{type: 'Component', component: TEST_COMPONENT_NAME, props: {a: 1, b: 2}},
			toOptions(),
		),
		{id: 'a_0', type: 'Component', component: TEST_COMPONENT_NAME, props: {a: 1, b: 2}},
	);
	assert.equal(
		parseBlock(
			{type: 'Component', component: 'MissingComponentShouldBeIgnored', props: {a: 1, b: 2}},
			toOptions(),
		),
		undefined,
	);
	assert.equal(
		parseBlock(
			{
				id: '1',
				type: 'Component',
				component: TEST_COMPONENT_NAME,
				props: {a: 1, b: 2, shouldBeRemoved: undefined},
				extrajunk: {should: 'be removed'},
			},
			toOptions(),
		),
		{
			id: '1',
			type: 'Component',
			component: TEST_COMPONENT_NAME,
			props: {a: 1, b: 2},
		},
	);
});

// TODO test children, other tags, ...

test__parseBlock('parses data into an ElementBlock or not', () => {
	assert.is(parseBlock(undefined, toOptions()), undefined);
	assert.is(parseBlock({}, toOptions()), undefined);
	assert.is(parseBlock({id: '1'}, toOptions()), undefined);
	assert.is(parseBlock({type: 'Element'}, toOptions()), undefined);
	assert.is(parseBlock({element: 'div'}, toOptions()), undefined);
	assert.is(parseBlock({attributes: {class: 'c1'}}, toOptions()), undefined);
	assert.is(parseBlock({id: '1', type: 'Element'}, toOptions()), undefined);
	assert.is(parseBlock({id: '1', element: 'div'}, toOptions()), undefined);
	assert.is(parseBlock({id: '1', attributes: {class: 'c1'}}, toOptions()), undefined);
	assert.equal(parseBlock({id: '1', type: 'Element', element: 'div'}, toOptions()), {
		id: '1',
		type: 'Element',
		element: 'div',
	});
	assert.is(
		parseBlock({id: '1', type: 'Element', attributes: {class: 'c1'}}, toOptions()),
		undefined,
	);
	assert.is(
		parseBlock({id: '1', element: 'div', attributes: {class: 'c1'}}, toOptions()),
		undefined,
	);
	assert.is(
		parseBlock({type: 'Element', element: 'div', attributes: {class: 'c1'}}, toOptionsWithoutId()),
		undefined,
	);
	assert.equal(parseBlock({type: 'Element', element: 'div'}, toOptions()), {
		id: 'a_0',
		type: 'Element',
		element: 'div',
	});
	assert.equal(
		parseBlock({type: 'Element', element: 'div', attributes: {class: 'c1'}}, toOptions()),
		{id: 'a_0', type: 'Element', element: 'div', attributes: {class: 'c1'}},
	);
	assert.equal(
		parseBlock(
			{
				type: 'Element',
				element: 'div',
				attributes: {class: 'c1'},
				children: [
					{type: 'Text', content: '0'},
					{
						type: 'Element',
						element: 'div',
						attributes: {class: 'c1'},
						children: [
							{type: 'Text', content: '1'},
							{type: 'Text', content: '2'},
						],
					},
					{type: 'Text', content: '4'},
				],
			},
			toOptions(),
		),
		{
			id: 'a_5',
			type: 'Element',
			element: 'div',
			attributes: {class: 'c1'},
			children: [
				{id: 'a_0', type: 'Text', content: '0'},
				{
					id: 'a_3',
					type: 'Element',
					element: 'div',
					attributes: {class: 'c1'},
					children: [
						{id: 'a_1', type: 'Text', content: '1'},
						{id: 'a_2', type: 'Text', content: '2'},
					],
				},
				{id: 'a_4', type: 'Text', content: '4'},
			],
		},
	);
	assert.equal(
		parseBlock(
			{type: 'Element', element: 'div', attributes: {style: 'shouldBeRemoved'}},
			toOptions(),
		),
		{id: 'a_0', type: 'Element', element: 'div', attributes: {}},
	);
	assert.equal(parseBlock({type: 'Element', element: 'doesntexist'}, toOptions()), undefined);
	assert.equal(
		parseBlock({type: 'Element', element: 'div', onClick: {type: 'ToggleDevmode'}}, toOptions()),
		{id: 'a_0', type: 'Element', element: 'div', onClick: {type: 'ToggleDevmode'}},
	);
	assert.equal(
		parseBlock(
			{
				id: '1',
				type: 'Element',
				element: 'div',
				attributes: {
					class: 'c1',
					href: 'hrefA',
					src: 'srcA',
					alt: 'altA',
					width: 210,
					height: 210,
					style: 'disabled_because_security_for_now', // disallow style (future: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API)
					shouldBeRemoved: true, // remove unknown attributes
					title: undefined, // remove `undefined`
				},
				onClick: {type: 'UnregisteredEventShouldBeRemoved'},
				extrajunk: {should: 'be removed'},
			},
			toOptions(),
		),
		{
			id: '1',
			type: 'Element',
			element: 'div',
			attributes: {
				class: 'c1',
				href: 'hrefA',
				src: 'srcA',
				alt: 'altA',
				width: 210,
				height: 210,
			},
		},
	);
});

// TODO maybe change this API to make `parseBlock` work on arrays?
// The reasoning to not support this is
// we don't want to pay the cost of reflection on every `parseBlock` call.
test__parseBlock('does not parse arrays', () => {
	assert.is(parseBlock([], toOptions()), undefined);
	assert.is(parseBlock([{type: 'Text'}], toOptions()), undefined);
});

test__parseBlock.run();
/* test__parseBlock */

/* test__parseBlocks */
const test__parseBlocks = suite('parseBlocks');

test__parseBlocks('parses an array of blocks', () => {
	assert.is(parseBlocks(undefined, toOptions()), undefined);
	assert.is(parseBlocks({}, toOptions()), undefined);
	assert.equal(parseBlocks([], toOptions()), []);
	assert.equal(parseBlocks([{type: 'Text'}], toOptions()), []);
	assert.equal(
		parseBlocks(
			[{type: 'Text', content: 'a'}, {type: 'Text'}, {type: 'Text', content: 'b'}],
			toOptions(),
		),
		[
			{id: 'a_0', type: 'Text', content: 'a'},
			{id: 'a_1', type: 'Text', content: 'b'},
		],
	);
});

test__parseBlocks.run();
/* test__parseBlocks */
