<script lang="ts">
	import {getApp} from '$lib/app/app';
	import type {Block} from '$lib/ui/block';
	import Message from '@feltcoop/felt/ui/Message.svelte';

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
			{...block.props}
		>
			{#each block.children as child (child.id)}<svelte:self block={child} />{/each}
		</h1>{:else if block.name === 'h2'}<h2 {...block.props}>
			{#each block.children as child (child.id)}<svelte:self block={child} />{/each}
		</h2>{:else if block.name === 'h3'}<h3 {...block.props}>
			{#each block.children as child (child.id)}<svelte:self block={child} />{/each}
		</h3>{:else if block.name === 'blockquote'}<blockquote {...block.props}>
			{#each block.children as child (child.id)}<svelte:self block={child} />{/each}
		</blockquote>{:else if block.name === 'p'}<p {...block.props}>
			{#each block.children as child (child.id)}<svelte:self block={child} />{/each}
		</p>{:else if block.name === 'span'}<span {...block.props}>
			{#each block.children as child (child.id)}<svelte:self block={child} />{/each}
		</span>{:else if block.name === 'div'}<div {...block.props}>
			{#each block.children as child (child.id)}<svelte:self block={child} />{/each}
		</div>{:else if block.name === 'img'}<img {...block.props} />{:else}<Message status="error"
			>unknown block name '{block.name}'</Message
		>{/if}{/if}
