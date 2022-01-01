<script lang="ts">
	import type {Block} from '$lib/ui/block';

	// A succict view of a block, suitable for a single line in a list.

	export let block: Block;
</script>

<!-- TODO show props? {JSON.stringify(block.props)} -->

<!-- svelte-ignore a11y-missing-attribute -->
{#if block.type === 'Component'}{block.component}{:else if block.type === 'Text'}text: <small
		>{block.content}</small
	>{:else if block.type === 'Element'}{block.element}{/if}
