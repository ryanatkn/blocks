<script lang="ts">
	import BlockView from '$lib/ui/BlockView.svelte';
	import {fly} from 'svelte/transition';
	import type {Block} from '$lib/ui/block';
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';
	import {stripStart} from '@feltcoop/felt/util/string.js';

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
				<div class="controls panel-inset" transition:fly|local={{y: 25, duration: 500}}>
					<!-- TODO generic component -->
					{#if block.type === 'Component' && block.component === 'Iframe'}
						<a href={block.props.src}>{stripStart(block.props.src, 'https://')}</a>
					{:else}
						<code>TODO</code> controls
					{/if}
				</div>
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
	.controls {
		text-align: center;
		height: var(--nav_height);
		position: absolute;
		left: 0;
		top: calc(var(--nav_height) * -1);
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
