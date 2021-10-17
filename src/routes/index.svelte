<script lang="ts">
	import {getApp} from '$lib/app/app';
	import {defaultBlocks} from '$lib/app/blocks';
	import BlockView from '$lib/ui/BlockView.svelte';
	import Editor from '$lib/ui/Editor.svelte';
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';

	const {blocks, selectedBlockKey} = getApp();

	const devmode = getDevmode();

	$blocks = defaultBlocks;
</script>

<!-- TODO maybe don't show editor when !$editing -->
<main class:devmode={$devmode}>
	<section class="content">
		<BlockView block={$blocks[$selectedBlockKey]} />
	</section>
	{#if $devmode}
		<section class="editor">
			<Editor block={$blocks[$selectedBlockKey]} {selectedBlockKey} />
		</section>
	{/if}
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
	}
	main > section {
		width: 100%;
		height: 100%;
	}
	.devmode > section {
		width: 50%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
