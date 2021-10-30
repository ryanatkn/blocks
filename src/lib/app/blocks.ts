import type {Block} from '$lib/ui/block';
import {toToClientId} from '@feltcoop/felt/util/id.js';
import defaultBlocksJson from '$lib/blocks.json';

export const toBlockId = toToClientId('block', undefined, '');

const blocks: Block[] = [
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
			src: 'https://spiderspace.github.io/css-vars',
			class: 'column',
			width: 'var(--column_width)',
			height: 1580, // TODO hacky -- let the iframe request a size, and enforce min/max
		},
	},
	{
		id: toBlockId(),
		type: 'Component',
		component: 'Iframe',
		props: {
			src: 'https://spiderspace.github.io/css-vars/type/px',
			class: 'column',
			width: 'var(--column_width)',
			height: 600, // TODO hacky -- let the iframe request a size, and enforce min/max
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
		name: 'img',
		attributes: {
			class: 'pixelated rotating-hue',
			alt: 'spiderspace logo',
			src: 'favicon.png',
			width: 256,
			height: 256,
		},
	},
];

export const defaultBlocks: Record<string, Block> = defaultBlocksJson || {
	'/': {
		id: toBlockId(),
		type: 'Component',
		component: 'Column',
		props: {
			blocks,
		},
	},
	'2': {
		id: toBlockId(),
		type: 'Component',
		component: 'Dash',
		props: {
			blocks,
		},
	},
	'3': {
		id: toBlockId(),
		type: 'Component',
		component: 'Full',
		props: {
			blocks,
		},
	},
};
