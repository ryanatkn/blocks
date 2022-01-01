<script lang="ts">
	// TODO name? `BackgroundImage`? `BackgroundView`?

	export let src: string;
	export let alt: string;
	export let classes: string = '';
</script>

<img {src} {alt} class={classes} />

<style>
	img {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: -1;
		opacity: 0.05;
	}
</style>
