import type {Block} from '$lib/ui/block';
import {toToClientId} from '@feltcoop/felt/util/id.js';

export const toBlockId = toToClientId('block', undefined, '');

// TODO make a schema for this and use it to validate/parse

// TODO maybe use Activity Streams?
// {
// 	id: toBlockId(),
// 	type: 'Element', // extends `Collection`
// 	name: 'h1',
// 	attributes: {class: 'panel-inset markup'},
// 	items: [
// 		{
// 			id: toBlockId(),
// 			type: 'Text',
// 			content: 'spiderspace',
// 		},
// 	],
// },

export const defaultBlocks: Block[] = [
	{
		id: toBlockId(),
		type: 'Element',
		element: 'div',
		attributes: {class: 'panel-inset markup'},
		children: [
			{
				id: toBlockId(),
				type: 'Element',
				element: 'h1',
				attributes: {class: 'flex'},
				children: [
					{
						id: toBlockId(),
						type: 'Text',
						content: 'spiderspace',
					},
					{
						id: toBlockId(),
						type: 'Element',
						element: 'img',
						attributes: {
							class: 'pixelated rotating-hue',
							src: 'favicon.png',
							alt: 'spiderspace logo',
							width: 16,
							height: 16,
						},
					},
				],
			},
		],
	},
	{
		id: toBlockId(),
		type: 'Element',
		element: 'blockquote',
		children: [
			{
				id: toBlockId(),
				type: 'Text',
				content: 'be advised: press ',
			},
			{
				id: toBlockId(),
				type: 'Element',
				element: 'button',
				attributes: {
					class: 'inline',
				},
				onClick: {
					// TODO `type: 'Event'` ?  (or `Command` and `Effect`?)
					name: 'toggle_devmode', // TODO or `devmode.toggle` ?
				},
				children: [
					{
						id: toBlockId(),
						type: 'Text',
						content: '`',
					},
				],
			},
			{
				id: toBlockId(),
				type: 'Element',
				element: 'code',
				children: [
					// TODO make this a button with a declarative action that triggers that event?
					{
						id: toBlockId(),
						type: 'Text',
						content: 'Backtick',
					},
				],
			},
			{
				id: toBlockId(),
				type: 'Text',
				content: ' at your own risk',
			},
		],
	},
	{
		id: toBlockId(),
		type: 'Component',
		component: 'Iframe',
		props: {src: 'https://spiderspace.github.io/about', width: 380, height: 300},
	},
	{
		id: toBlockId(),
		type: 'Component',
		component: 'Background',
		props: {
			src: 'favicon.png',
			alt: 'spiderspace logo',
			classes: 'pixelated rotating-hue',
		},
	},
	{
		id: toBlockId(),
		type: 'Element',
		element: 'a',
		attributes: {
			href: 'https://github.com/spiderspace',
		},
		children: [
			{
				id: toBlockId(),
				type: 'Element',
				element: 'img',
				attributes: {
					class: 'pixelated rotating-hue',
					src: 'favicon.png',
					alt: 'spiderspace logo',
					width: 256,
					height: 256,
				},
			},
		],
	},
];
