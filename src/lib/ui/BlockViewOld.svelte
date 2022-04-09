<script lang="ts">
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';
	import Message from '@feltcoop/felt/ui/Message.svelte'; // TODO maybe remove this dependency

	import {getApp} from '$lib/app/app';
	import type {Block, ElementBlock} from '$lib/ui/block';
	import BlockViewChildren from '$lib/ui/BlockViewChildren.svelte';

	// TODO `a` should not override `target`/`rel` if it's an internal or trusted host
	// TODO make the backtick-quoted entities in the error messages interactive UI components

	const {parseOptions} = getApp();

	export let block: Block;

	const devmode = getDevmode();

	const toClickHandler =
		(block: ElementBlock): any =>
		(e: MouseEvent) => {
			// TOOD `dispatch(block.onClick.name)` ?
			if (block.onClick!.name === 'ToggleDevmode') {
				$devmode = !$devmode;
			} else {
				console.log('handle button click', e, block.onClick);
			}
		};
</script>

<!-- svelte-ignore a11y-missing-attribute -->
{#if block.type === 'Component'}<svelte:component
		this={parseOptions.components.get(block.component)}
		{...block.props}
	/>{:else if block.type === 'Text'}{block.content}{:else if block.type === 'Element'}{#if block.element === 'a'}<a
			{...block.attributes}
			target="_blank"
			rel="noreferrer noopener nofollow"
		>
			<BlockViewChildren {block} />
		</a>{:else if block.element === 'button'}<button
			{...block.attributes}
			on:click={block.onClick ? toClickHandler(block) : undefined}
		>
			<BlockViewChildren {block} />
		</button>{:else if block.element === 'h1'}<h1 {...block.attributes}>
			<BlockViewChildren {block} />
		</h1>{:else if block.element === 'h2'}<h2 {...block.attributes}>
			<BlockViewChildren {block} />
		</h2>{:else if block.element === 'h3'}<h3 {...block.attributes}>
			<BlockViewChildren {block} />
		</h3>{:else if block.element === 'blockquote'}<blockquote {...block.attributes}>
			<BlockViewChildren {block} />
		</blockquote>{:else if block.element === 'p'}<p {...block.attributes}>
			<BlockViewChildren {block} />
		</p>{:else if block.element === 'code'}<code {...block.attributes}>
			<BlockViewChildren {block} />
		</code>{:else if block.element === 'span'}<span {...block.attributes}>
			<BlockViewChildren {block} />
		</span>{:else if block.element === 'div'}<div {...block.attributes}>
			<BlockViewChildren {block} />
		</div>{:else if block.element === 'img'}<img {...block.attributes} />{:else}<Message
			status="error"
			>unknown element <code>'{block.element}'</code>
			for <code>Block</code> <code>{block.id}</code></Message
		>{/if}{/if}
