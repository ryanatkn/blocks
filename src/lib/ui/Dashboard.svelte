<script lang="ts">
	import BlockView from '$lib/ui/BlockView.svelte';
	import type {Block} from '$lib/ui/block';
	import BlockSummary from './BlockSummary.svelte';

	export let blocks: Block[];

	$: console.log('blocks', blocks);
</script>

<!-- TODO instead of this, maybe pass a slot to `BlockView` to wrap the section -->

<div class="dashboard">
	<div class="nav column-sm">
		<nav>
			<!-- TODO show nested items -->
			<ol>
				{#each blocks as block (block.id)}
					<li>
						<BlockSummary {block} />
					</li>
				{/each}
			</ol>
		</nav>
	</div>
	<div class="content markup">
		{#each blocks as block (block.id)}
			{#if block.type === 'Component' && block.component === 'Iframe'}
				<section class="portal">
					<BlockView {block} />
				</section>
			{:else}
				<section>
					<BlockView {block} />
				</section>
			{/if}
		{/each}
	</div>
</div>

<style>
	.dashboard {
		display: flex;
		width: 100%;
		height: 100%;
	}
	.nav {
		height: 100%;
		overflow: auto;
	}
	.content {
		height: 100%;
		flex: 1;
		/* TODO do we need to focus() the .content on mount and add `tabindex="-1"`?  */
		overflow: auto;
	}
	/* TODO */
	.portal {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
