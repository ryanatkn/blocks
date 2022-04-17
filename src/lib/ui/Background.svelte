<script lang="ts">
	// TODO name? `BackgroundImage`? `BackgroundView`?

	export let src: string;
	export let alt: string;
	export let classes = '';
</script>

<img {src} {alt} class={classes} />

<style>
	img {
		position: fixed;
		inset: 0;
		z-index: -1;
		opacity: 0.05;
		width: 100%;
		height: 100%;
	}
</style>
