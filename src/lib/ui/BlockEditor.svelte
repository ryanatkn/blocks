<script lang="ts">
	import type {Writable} from 'svelte/store';

	import {parseBlock, parseBlocks, type Block, type ParseBlockOptions} from '$lib/ui/block';

	export let blocks: Writable<Block[]>;
	export let parseOptions: ParseBlockOptions;

	// TODO extract this behavior to a component
	let editingBlocks = true;

	// TODO problem is this doesn't update when `$blocks` changes
	$: blocksStr = JSON.stringify($blocks, null, '	');

	let error: string | undefined;

	const updateBlocks = (str: string) => {
		let json: any;
		try {
			json = JSON.parse(str);
			error = undefined;
		} catch (err) {
			// TODO display JSON parse error
			error = 'failed to parse JSON';
		}
		const parsed = parseBlocks(json, parseOptions);
		if (parsed) {
			$blocks = parsed;
		}
	};

	const addBlock = (block: Block) => {
		$blocks = $blocks.concat(block);
	};

	const onClickAdd = () => {
		const src = prompt('enter iframe src:', 'https://about.spiderspace.org'); // eslint-disable-line no-alert
		if (!src) return;
		addBlock(parseBlock({type: 'Component', component: 'Iframe', props: {src}}, parseOptions)!);
	};
</script>

<button on:click={onClickAdd}> add block </button>
<button on:click={() => (editingBlocks = !editingBlocks)}>
	{#if editingBlocks}close{:else}open{/if} block editor
</button>
{#if editingBlocks}
	<pre class:error={!!error}>
    <textarea
			value={blocksStr}
			on:input={(e) => {
				updateBlocks(e.currentTarget.value);
			}}
		/>
  </pre>
{/if}

<style>
	pre {
		display: flex;
		flex: 1;
	}
	/* TODO style this better, it is really bad */
	.error textarea {
		background-color: var(--error_color);
	}
	textarea {
		/* TODO remove font size after upgrading Felt */
		font-size: var(--font_size_md);
		height: 100%;
		tab-size: 2;
	}
</style>
