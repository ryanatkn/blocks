<script lang="ts">
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';

	import {getApp} from '$lib/app/app';
	import {parseOptions} from '$lib/app/blocks';
	import {type Block} from '$lib/ui/block';
	import BlockView from '$lib/ui/BlockView.svelte';
	import Editor from '$lib/ui/Editor.svelte';

	const {blocks, selectedLayout, layouts} = getApp();

	const devmode = getDevmode();

	let block: Block;
	// TODO should this parse?
	$: block = {
		id: parseOptions.toId!(), // TODO hmm very hacky, should these be directly on app?
		type: 'Component',
		component: $selectedLayout as any, // TODO hmmm
		props: {blocks: $blocks},
	};
</script>

<!-- TODO maybe don't show editor when !$editing -->
<main class:devmode={$devmode}>
	<section class="content">
		<BlockView {block} />
	</section>
	{#if $devmode}
		<section class="editor">
			<Editor {blocks} {block} {selectedLayout} {layouts} {parseOptions} />
		</section>
	{/if}
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
	}
	section {
		width: 100%;
		height: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.editor {
		position: fixed;
		top: 0;
		right: 0;
		/* TODO refactor -- only makes sense on the `Column` layout */
		width: calc(((100vw - (2 * (100vw - 100%))) - var(--column_width)) / 2);
		min-width: var(--column_width_min);
	}
</style>
