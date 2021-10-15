<script lang="ts">
	import Iframe from '$lib/ui/Iframe.svelte';
	import type {Block} from '$lib/ui/block';

	export let block: Block;
</script>

<!-- TODO could do a generic lookup and use `svelte:component` for the non-element ones -->

<!-- svelte-ignore a11y-missing-attribute -->
{#if block.type === 'Iframe'}<Iframe {...block.props} />{:else if block.type === 'Image'}<img
		{...block.props}
	/>{:else if block.type === 'Text'}{block.content}{:else if block.type === 'H1'}<h1
		{...block.props}
	>
		{#each block.children as child (child.id)}<svelte:self block={child} />{/each}
	</h1>{:else if block.type === 'Blockquote'}<blockquote {...block.props}>
		{#each block.children as child (child.id)}<svelte:self block={child} />{/each}
	</blockquote>{/if}
