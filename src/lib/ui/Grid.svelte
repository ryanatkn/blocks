<script lang="ts">
	import BlockView from '$lib/ui/BlockView.svelte';
	import {type Block} from '$lib/ui/block';

	// TODO name?

	export let blocks: Block[];

	$: console.log('blocks', blocks);
</script>

<!-- TODO lay out with 2d translates -->

<div class="grid">
	{#each blocks as block (block.id)}
		<BlockView {block} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		width: 100%;
		height: 100%;
	}
</style>
