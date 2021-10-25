<script lang="ts">
	import PendingAnimationOverlay from '$lib/ui/PendingAnimationOverlay.svelte';

	let loaded = false;
</script>

<!--
	Iframe docs: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe
	The main omitted sandbox permissions are `allow-same-origin` and `allow-top-navigation`.
-->

<div class="iframe-wrapper">
	<iframe
		sandbox="allow-downloads-without-user-activation allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-storage-access-by-user-activation"
		frameborder="0"
		title="iframe"
		{...$$restProps}
		on:load={() => (loaded = true)}
	/>
	{#if !loaded}
		<PendingAnimationOverlay />
	{/if}
</div>

<style>
	.iframe-wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		position: relative; /* for the absolute positioned pending animation */
	}
	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}
</style>
