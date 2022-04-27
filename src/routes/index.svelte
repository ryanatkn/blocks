<script lang="ts">
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';
	import {scale} from 'svelte/transition';

	import SvastEditor from '$lib/ui/SvastEditor.svelte';
	import SvastView from '$lib/ui/SvastView.svelte';
	import {getApp} from '$lib/app/app';

	const devmode = getDevmode();

	const {view, viewCode, updateView} = getApp();
</script>

<main class:devmode={$devmode}>
	<section class="view">
		<SvastView view={$view} />
	</section>
	{#if $devmode}
		<section class="editor" in:scale={{start: 0.8}} out:scale={{duration: 92}}>
			<SvastEditor view={$view} viewCode={$viewCode} on:change={(e) => updateView(e.detail)} />
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
