<script lang="ts">
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';

	import BlockView from '$lib/ui/BlockView.svelte';
	import {type Block} from '$lib/ui/block';
	import BlockViewControls from '$lib/ui/BlockViewControls.svelte';

	const devmode = getDevmode(); // TODO maybe make this a prop instead?

	$: controls = $devmode;

	export let blocks: Block[];

	// TODO consider `export let controls: boolean = true;`

	$: console.log('blocks', blocks);
</script>

<!-- TODO instead of this, maybe pass a slot to `BlockView` to wrap the section -->

<div class="column markup">
	{#each blocks as block (block.id)}
		<div
			class="block {block.type === 'Component' && block.component === 'Iframe'
				? 'portal portal-iframe panel-outset'
				: ''}"
		>
			{#if controls}
				<BlockViewControls {block} />
			{/if}
			<BlockView {block} />
		</div>
	{/each}
</div>

<style>
	.column {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--spacing_xl5) 0;
	}
	.block {
		margin-bottom: var(--spacing_xl7);
		position: relative; /* for the absolute positioned controls */
	}
	.portal {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
