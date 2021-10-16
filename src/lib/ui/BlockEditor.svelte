<script lang="ts">
	import type {Block} from '$lib/ui/block';
	import {getApp} from '$lib/app/app';
	import {toBlockId} from '$lib/app/blocks';

	const {blocks} = getApp();

	export let block: Block;

	// TODO extract this behavior to a component
	let editingBlocks = true;

	// TODO problem is this doesn't update when `$blocks` changes
	let blocksStr = JSON.stringify($blocks, null, 2);

	const updateBlocks = (str: string) => {
		try {
			$blocks = JSON.parse(str);
		} catch (err) {}
	};

	const addBlock = (block: Block) => {
		// TODO this is hardcoded for one block
		// TODO yikes -- immer?
		const selectedBlock: any = $blocks['/'];
		$blocks = {
			...$blocks,
			'/': {
				...selectedBlock,
				props: {...selectedBlock.props, blocks: selectedBlock.props.blocks.concat(block)},
			},
		};
		blocksStr = JSON.stringify($blocks, null, 2); // TODO make reactive
	};
</script>

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
	add block
</button>
<button on:click={() => (editingBlocks = !editingBlocks)}>
	{#if editingBlocks}close{:else}open{/if} block editor
</button>
{#if editingBlocks}
	<pre>
    <textarea value={blocksStr} on:input={(e) => {
      updateBlocks(blocksStr = e.currentTarget.value);
    }}></textarea>
  </pre>
{/if}

<style>
	textarea {
		/* TODO remove font size after upgrading Felt */
		font-size: var(--font_size_md);
		/* TODO how to get good default sizing? */
		height: 700px;
	}
</style>
