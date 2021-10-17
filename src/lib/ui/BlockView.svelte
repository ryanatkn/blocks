<script lang="ts">
	import {getApp} from '$lib/app/app';
	import type {Block} from '$lib/ui/block';
	import Message from '@feltcoop/felt/ui/Message.svelte';
	import BlockViewChildren from '$lib/ui/BlockViewChildren.svelte';

	const {components} = getApp();

	export let block: Block;
</script>

<!-- TODO not sure about any of this, what I probably want is a subset of the Svelte AST -->

<!-- TODO could do a generic lookup and use `svelte:component` for the non-element ones -->

<!-- svelte-ignore a11y-missing-attribute -->
{#if block.type === 'Component'}<svelte:component
		this={components[block.component]}
		{...block.props}
	/>{:else if block.type === 'Text'}{block.content}{:else if block.type === 'Element'}{#if block.name === 'h1'}<h1
			{...block.attributes}
		>
			<BlockViewChildren {block} />
		</h1>{:else if block.name === 'h2'}<h2 {...block.attributes}>
			<BlockViewChildren {block} />
		</h2>{:else if block.name === 'h3'}<h3 {...block.attributes}>
			<BlockViewChildren {block} />
		</h3>{:else if block.name === 'blockquote'}<blockquote {...block.attributes}>
			<BlockViewChildren {block} />
		</blockquote>{:else if block.name === 'p'}<p {...block.attributes}>
			<BlockViewChildren {block} />
		</p>{:else if block.name === 'span'}<span {...block.attributes}>
			<BlockViewChildren {block} />
		</span>{:else if block.name === 'div'}<div {...block.attributes}>
			<BlockViewChildren {block} />
		</div>{:else if block.name === 'img'}<img {...block.attributes} />{:else}<Message status="error"
			>unknown block name '{block.name}'</Message
		>{/if}{/if}
