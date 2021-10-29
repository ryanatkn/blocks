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
			class: 'pixelated',
			alt: 'spiderspace logo',
			src: '/favicon.png',
			width: 256,
			height: 256,
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
			height: 980,
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
			class: 'pixelated',
			alt: 'spiderspace logo',
			src: '/favicon.png',
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
