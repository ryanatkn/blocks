import {toToClientId} from '@feltcoop/felt/util/id.js';

import {type Block, parseBlocks, type ParseBlockOptions} from '$lib/ui/block';
import {components} from '$lib/app/components';
import {events} from '$lib/app/events';
import {base} from '$app/paths';

// TODO where does this belong?
export const parseOptions: ParseBlockOptions = {
	toId: toToClientId('block'),
	components,
	events,
};

// TODO make a schema for this and use it to validate/parse
// TODO should `children` instead be the Activity Streams `Collection` `items`?

export const defaultBlocks: Block[] = parseBlocks(
	[
		{
			type: 'Element',
			element: 'div',
			attributes: {class: 'panel-inset markup'},
			children: [
				{
					type: 'Element',
					element: 'h1',
					attributes: {class: 'flex'},
					children: [
						{
							type: 'Text',
							content: 'spiderspace',
						},
						{
							type: 'Element',
							element: 'img',
							onClick: {name: 'ToggleDevmode'},
							attributes: {
								class: 'pixelated rotating-hue',
								src: base + '/favicon.png',
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
			type: 'Element',
			element: 'blockquote',
			children: [
				{
					type: 'Text',
					content: 'press ',
				},
				{
					type: 'Element',
					element: 'button',
					attributes: {
						class: 'inline',
					},
					onClick: {name: 'ToggleDevmode'},
					children: [
						{
							type: 'Element',
							element: 'img',
							attributes: {
								class: 'pixelated rotating-hue',
								src: base + '/favicon.png',
								alt: 'spiderspace logo',
								width: 32,
								height: 32,
							},
						},
					],
				},
				{
					type: 'Element',
					element: 'code',
					children: [
						// TODO make this a button with a declarative action that triggers that event?
						{
							type: 'Text',
							content: '`',
						},
						{
							type: 'Text',
							content: 'Backtick',
						},
					],
				},
				{
					type: 'Text',
					content: ' to enter devmode',
				},
			],
		},
		{
			type: 'Component',
			component: 'Iframe',
			props: {src: 'https://spiderspace.github.io/about', width: 380, height: 300},
		},
		{
			type: 'Component',
			component: 'Background',
			props: {
				src: base + '/favicon.png',
				alt: 'spiderspace logo',
				classes: 'pixelated rotating-hue',
			},
		},
		{
			type: 'Element',
			element: 'img',
			onClick: {name: 'ToggleDevmode'},
			attributes: {
				class: 'pixelated rotating-hue',
				src: base + '/favicon.png',
				alt: 'spiderspace logo',
				width: 256,
				height: 256,
			},
		},
	],
	parseOptions,
)!;
