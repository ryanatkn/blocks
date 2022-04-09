import {toToClientId} from '@feltcoop/felt/util/id.js';

import {type Block, parseBlocks, type ParseBlockOptions} from '$lib/ui/block';
import {components} from '$lib/app/components';
import {events} from '$lib/app/events';

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
			type: 'Element',
			element: 'blockquote',
			children: [
				{
					type: 'Text',
					content: 'be advised: press ',
				},
				{
					type: 'Element',
					element: 'button',
					attributes: {
						class: 'inline',
					},
					onClick: {
						type: 'ClientEvent',
						name: 'ToggleDevmode',
					},
					children: [
						{
							type: 'Text',
							content: '`',
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
							content: 'Backtick',
						},
					],
				},
				{
					type: 'Text',
					content: ' at your own risk',
				},
			],
		},
		{
			type: 'Element',
			element: 'a',
			attributes: {
				href: 'https://github.com/spiderspace/mutable',
				rel: 'noreferrer',
				target: '_blank',
			},
			children: [
				{
					type: 'Text',
					content: 'spiderspace/mutable',
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
				src: 'favicon.png',
				alt: 'spiderspace logo',
				classes: 'pixelated rotating-hue',
			},
		},
		{
			type: 'Element',
			element: 'a',
			attributes: {
				href: 'https://github.com/spiderspace',
				rel: 'noreferrer',
				target: '_blank',
			},
			children: [
				{
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
	],
	parseOptions,
)!;
