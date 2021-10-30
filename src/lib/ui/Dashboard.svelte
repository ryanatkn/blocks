<script lang="ts">
	import BlockView from '$lib/ui/BlockView.svelte';
	import type {Block} from '$lib/ui/block';

	export let blocks: Block[];

	$: console.log('blocks', blocks);
</script>

<!-- TODO instead of this, maybe pass a slot to `BlockView` to wrap the section -->

<div class="dashboard">
	<div class="column-min">
		<nav>
			<button>todo</button><button>add</button><button>these</button><button>as</button><button
				>props</button
			>
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
	.content {
		flex: 1;
	}
	/* TODO */
	.portal {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
