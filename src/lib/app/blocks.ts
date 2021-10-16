import type {Block} from '$lib/ui/block';
import {toToClientId} from '@feltcoop/felt/util/id.js';
import defaultBlocksJson from '$lib/blocks.json';

export const toBlockId = toToClientId('block', undefined, '');

export const defaultBlocks: Record<string, Block> = defaultBlocksJson || {
	'/': {
		id: toBlockId(),
		type: 'Component',
		component: 'Column',
		props: {
			blocks: [
				{
					id: toBlockId(),
					type: 'Element',
					name: 'h1',
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
					type: 'Element',
					name: 'img',
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
			],
		},
	},
};
