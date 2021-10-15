import type {Block} from '$lib/ui/block';
import {toToClientId} from '@feltcoop/felt/util/id.js';

export const toBlockId = toToClientId('block');

export const defaultBlocks: Block[] = [
	{
		id: toBlockId(),
		type: 'H1',
		props: {class: 'panel-inset markup'},
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
		type: 'Image',
		props: {
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
		props: {src: 'https://spiderspace.github.io/about'},
	},
];
