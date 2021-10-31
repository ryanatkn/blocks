<script lang="ts">
	import {getApp} from '$lib/app/app';
	import {toBlockId} from '$lib/app/blocks';
	import type {Block} from '$lib/ui/block';
	import BlockView from '$lib/ui/BlockView.svelte';
	import Editor from '$lib/ui/Editor.svelte';
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';

	const {blocks, selectedProfile, profiles} = getApp();

	const devmode = getDevmode();

	let block: Block;
	$: block = {
		id: toBlockId(),
		type: 'Component',
		component: $selectedProfile,
		props: {
			blocks: $blocks,
		},
	};
</script>

<!-- TODO maybe don't show editor when !$editing -->
<main class:devmode={$devmode}>
	<section class="content">
		<BlockView {block} />
	</section>
	{#if $devmode}
		<section class="editor">
			<Editor {blocks} {block} {selectedProfile} {profiles} />
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
	.devmode section {
		width: 50%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.editor {
		position: sticky;
		top: 0;
	}
</style>
