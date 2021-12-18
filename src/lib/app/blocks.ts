import type {Block} from '$lib/ui/block';
import {toToClientId} from '@feltcoop/felt/util/id.js';

export const toBlockId = toToClientId('block', undefined, '');

// TODO make a schema for this and use it to validate/parse

export const defaultBlocks: Block[] = [
	{
		id: toBlockId(),
		type: 'Element',
		name: 'h1',
		attributes: {class: 'panel-inset markup'},
		children: [
			{
				id: toBlockId(),
				type: 'Text',
				content: 'spiderspace',
			},
		],
	},
	{
		id: toBlockId(),
		type: 'Element',
		name: 'blockquote',
		children: [
			{
				id: toBlockId(),
				type: 'Text',
				content: 'be advised: press ',
			},
			{
				id: toBlockId(),
				type: 'Element',
				name: 'button',
				attributes: {
					class: 'inline',
				},
				onClick: {
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
				name: 'code',
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
		type: 'Element',
		name: 'img',
		attributes: {
			class: 'pixelated rotating-hue',
			// TODO I think we can safely support inline styles this with the CSP? see the main `__layout` for more
			// an alternative would be going to a more constrained interface, with structured access to style properties?
			style:
				'width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: -1; opacity: 0.05;',
			alt: 'spiderspace logo',
			src: 'favicon.png',
		},
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
		component: 'Iframe',
		props: {
			src: 'https://spiderspace.github.io/stylevar',
			class: 'column',
			width: 'var(--column_width)',
			height: 1800, // TODO hacky -- let the iframe request a size, and enforce min/max
		},
	},
	{
		id: toBlockId(),
		type: 'Component',
		component: 'Iframe',
		props: {
			src: 'https://spiderspace.github.io/stylevar/type/px',
			class: 'column',
			width: 'var(--column_width)',
			height: 650, // TODO hacky -- let the iframe request a size, and enforce min/max
		},
	},
	{
		id: toBlockId(),
		type: 'Component',
		component: 'Iframe',
		props: {src: 'https://spiderspace.github.io/about', width: 380, height: 300},
	},
	{
		id: toBlockId(),
		type: 'Element',
		name: 'a',
		attributes: {
			href: 'https://github.com/spiderspace',
		},
		children: [
			{
				id: toBlockId(),
				type: 'Element',
				name: 'img',
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
