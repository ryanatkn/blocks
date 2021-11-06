<script lang="ts">
	import PendingAnimationOverlay from '$lib/ui/PendingAnimationOverlay.svelte';

	export let src: string;
	export let width: number | string = '100%';
	export let height: number | string = '100%';

	$: widthCss = typeof width === 'number' ? width + 'px' : width;
	$: heightCss = typeof height === 'number' ? height + 'px' : height;

	let loaded = false;
</script>

<!--
	Iframe docs: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
	The main omitted sandbox permissions are `allow-same-origin` and `allow-top-navigation`.
	Also the experiemental ones are omitted because they throw errors:
	- `allow-downloads-without-user-activation`
	- `allow-storage-access-by-user-activation`
-->

<!-- TODO see about making a generic `loading` interface for block components -->
<div class="iframe-wrapper">
	<iframe
		loading="lazy"
		title="iframe"
		{...$$restProps}
		{src}
		sandbox="allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts"
		frameborder="0"
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
		position: relative; /* for the absolute positioned pending animation and controls */
		flex-direction: column;
	}
	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>
