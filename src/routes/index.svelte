<script lang="ts">
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';
	import {scale} from 'svelte/transition';
	import {compile} from 'svast-stringify';

	// import {getApp} from '$lib/app/app';
	import {defaultText} from '$lib/app/blocks';
	// import type {Block} from '$lib/ui/block';
	import SvastEditor from '$lib/ui/SvastEditor.svelte';
	import SvastView from '$lib/ui/SvastView.svelte';
	import {parseView, type ViewData} from '$lib/ui/view';

	// const {blocks, selectedLayout, layouts} = getApp();

	const devmode = getDevmode();

	// TODO BLOCK handle these to where they have stable ids, so e.g. the iframe doesn't reload on every change
	// TODO this is a bit unwieldy but allows us to avoid wasteful parsing because either could be the source of truth
	let viewCode = defaultText;
	let view = parseView(viewCode);

	// let block: Block;
	// TODO should this parse?
	// $: block = {
	// 	id: parseOptions.toId!(), // TODO hmm very hacky, should these be directly on app?
	// 	type: 'Component',
	// 	component: $selectedLayout as any, // TODO hmmm
	// 	props: {blocks: $blocks},
	// };

	const updateView = (updated: ViewData | string): void => {
		if (typeof updated === 'string') {
			viewCode = updated;
			view = parseView(viewCode);
		} else {
			view = updated;
			viewCode = compile(view);
		}
	};
</script>

<!-- TODO maybe don't show editor when !$editing -->
<main class:devmode={$devmode}>
	<section class="view">
		<SvastView {view} />
		<!-- <BlockView {block} /> -->
	</section>
	{#if $devmode}
		<section class="editor" in:scale={{start: 0.8}} out:scale={{duration: 92}}>
			<!-- TODO BLOCK design this API -->
			<SvastEditor {view} {viewCode} on:change={(e) => updateView(e.detail)} />
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
	.view {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.editor {
		transform-origin: center top;
		position: fixed;
		top: 0;
		right: 0;
		/* TODO refactor -- only makes sense on the `Column` layout */
		width: calc(((100vw - (2 * (100vw - 100%))) - var(--column_width)) / 2);
		min-width: var(--column_width_sm);
	}
</style>
