<script lang="ts">
	import BlockView from '$lib/ui/BlockView.svelte';
	import {toToClientId} from '@feltcoop/felt/util/id.js';
	import type {Block} from '$lib/ui/block';

	const toBlockId = toToClientId('block');

	let blocks: Block[] = [
		{
			id: toBlockId(),
			type: 'H1',
			props: {class: 'panel-inset markup'},
			children: [
				{
					id: toBlockId(),
					type: 'Text',
					content: 'spiderspace',
				},
			],
		},
		{
			id: toBlockId(),
			type: 'Image',
			props: {
				class: 'pixelated',
				alt: 'spiderspace logo',
				src: '/favicon.png',
				width: 256,
				height: 256,
			},
		},
		{
			id: toBlockId(),
			type: 'Component',
			component: 'Iframe',
			props: {src: 'https://spiderspace.github.io/about'},
		},
	];

	const addBlock = (block: Block) => {
		blocks = blocks.concat(block);
	};
</script>

<main class="column markup">
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
	<section>
		<button
			on:click={() => {
				const src = prompt('enter iframe src:', 'https://spiderspace.github.io/about');
				if (!src) return;
				addBlock({
					id: toBlockId(),
					type: 'Component',
					component: 'Iframe',
					props: {src},
				});
			}}
		>
			＋
		</button>
	</section>
</main>

<style>
	main {
		text-align: center;
		/* TODO should these be on `.column` ? */
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
	/* TODO hacky, need to figure out where this info belongs */
	.portal-iframe {
		width: 380px;
		height: 170px;
		flex-shrink: 0;
	}
</style>
