<script lang="ts">
	import PendingAnimationOverlay from '$lib/ui/PendingAnimationOverlay.svelte';
	import {stripStart} from '@feltcoop/felt/util/string.js';

	export let src: string;
	export let width: number | string = '100%';
	export let height: number | string = '100%';
	// TODO consider `export let showHeader: boolean = true;`

	$: widthCss = typeof width === 'number' ? width + 'px' : width;
	$: heightCss = typeof height === 'number' ? height + 'px' : height;

	let loaded = false;
</script>

<!--
	Iframe docs: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
	The main omitted sandbox permissions are `allow-same-origin` and `allow-top-navigation`.
-->

<div class="iframe-wrapper">
	<header>
		<a class="markup panel-inset" href={src}>{stripStart(src, 'https://')}</a>
	</header>
	<iframe
		{...$$restProps}
		{src}
		sandbox="allow-downloads-without-user-activation allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-storage-access-by-user-activation"
		frameborder="0"
		title="iframe"
		on:load={() => (loaded = true)}
		style="width: {widthCss}; height: {heightCss};"
	/>
	{#if !loaded}
		<PendingAnimationOverlay />
	{/if}
</div>

<style>
	.iframe-wrapper {
		display: flex;
		position: relative; /* for the absolute positioned pending animation */
		flex-direction: column;
	}
	header {
		text-align: center;
	}
	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>
