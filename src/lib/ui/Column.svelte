<script lang="ts">
	import BlockView from '$lib/ui/BlockView.svelte';
	import type {Block} from '$lib/ui/block';

	export let blocks: Block[];

	$: console.log('blocks', blocks);
</script>

<!-- TODO instead of this, maybe pass a slot to `BlockView` to wrap the section -->

<div class="column markup">
	{#each blocks as block (block.id)}
		{#if block.type === 'Component' && block.component === 'Iframe'}
			<section class="portal portal-iframe panel-outset">
				<BlockView {block} />
			</section>
		{:else}
			<section>
				<BlockView {block} />
			</section>
		{/if}
	{/each}
</div>

<style>
	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-left: 0;
		padding-right: 0;
	}
	/* TODO */
	.portal {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
