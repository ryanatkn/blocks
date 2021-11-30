<script lang="ts">
	import {getApp} from '$lib/app/app';
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';
	import type {Block, ButtonElementBlock} from '$lib/ui/block';
	import Message from '@feltcoop/felt/ui/Message.svelte'; // TODO maybe remove this dependency
	import BlockViewChildren from '$lib/ui/BlockViewChildren.svelte';

	const {components} = getApp();

	export let block: Block;

	const devmode = getDevmode();

	const toClickHandler =
		(block: ButtonElementBlock): any =>
		(e: MouseEvent) => {
			// TOOD `dispatch(block.onClick.name)`
			if (block.onClick!.name === 'toggle_devmode') {
				$devmode = !$devmode;
			} else {
				console.log('handle button click', e, block.onClick);
			}
		};
</script>

<!-- TODO maybe `a` should not override `target`/`rel` if it's an internal or trusted host -->

<!-- svelte-ignore a11y-missing-attribute -->
{#if block.type === 'Component'}<svelte:component
		this={components[block.component]}
		{...block.props}
	/>{:else if block.type === 'Text'}{block.content}{:else if block.type === 'Element'}{#if block.name === 'a'}<a
			{...block.attributes}
			target="_blank"
			rel="noreferrer"
		>
			<BlockViewChildren {block} />
		</a>{:else if block.name === 'button'}<button
			{...block.attributes}
			on:click={block.onClick ? toClickHandler(block) : undefined}
		>
			<BlockViewChildren {block} />
		</button>{:else if block.name === 'h1'}<h1 {...block.attributes}>
			<BlockViewChildren {block} />
		</h1>{:else if block.name === 'h2'}<h2 {...block.attributes}>
			<BlockViewChildren {block} />
		</h2>{:else if block.name === 'h3'}<h3 {...block.attributes}>
			<BlockViewChildren {block} />
		</h3>{:else if block.name === 'blockquote'}<blockquote {...block.attributes}>
			<BlockViewChildren {block} />
		</blockquote>{:else if block.name === 'p'}<p {...block.attributes}>
			<BlockViewChildren {block} />
		</p>{:else if block.name === 'code'}<code {...block.attributes}>
			<BlockViewChildren {block} />
		</code>{:else if block.name === 'span'}<span {...block.attributes}>
			<BlockViewChildren {block} />
		</span>{:else if block.name === 'div'}<div {...block.attributes}>
			<BlockViewChildren {block} />
		</div>{:else if block.name === 'img'}<img {...block.attributes} />{:else}<Message status="error"
			>unknown block name '{block.name}'</Message
		>{/if}{/if}
