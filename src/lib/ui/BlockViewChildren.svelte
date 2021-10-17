<script lang="ts">
	import type {Block} from '$lib/ui/block';
	import BlockView from '$lib/ui/BlockView.svelte';

	export let block: Block;
</script>

{#if 'children' in block}
	{#each block.children as child (child.id)}<svelte:component
			this={BlockView}
			block={child}
		/>{/each}
{/if}
