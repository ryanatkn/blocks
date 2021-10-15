<script lang="ts">
	import {getApp} from '$lib/app/app';
	import {defaultBlocks} from '$lib/app/blocks';
	import BlockView from '$lib/ui/BlockView.svelte';
	import BlockEditor from '$lib/ui/BlockEditor.svelte';

	const {blocks} = getApp();

	$blocks = defaultBlocks;
</script>

<!-- TODO maybe don't show editor when !$editing -->
<main>
	<section class="content">
		<BlockView block={$blocks['/']} />
	</section>
	<section class="editor">
		<BlockEditor block={$blocks['/']} />
	</section>
</main>

<style>
	main {
		width: 100%;
		height: 100%;
		display: flex;
	}
	main > section {
		width: 50%;
		height: 100%;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
