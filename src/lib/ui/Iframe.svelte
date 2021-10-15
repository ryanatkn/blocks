<script lang="ts">
	import PendingAnimationOverlay from '$lib/ui/PendingAnimationOverlay.svelte';

	// TODO should this be a more generic `Frame`?

	let loaded = false;
</script>

<!-- TODO figure out sandboxing -- allow-same-origin? -->

<div class="iframe-wrapper">
	<iframe
		sandbox="allow-scripts allow-pointer-lock"
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
