<script lang="ts">
	import Iframe from '$lib/ui/Iframe.svelte';
</script>

<main class="column markup">
	<section>
		<h1 class="panel-inset">spiderspace</h1>
		<img class="pixelated" alt="spiderspace logo" src="/favicon.png" />
	</section>
	<div class="portal panel-outset">
		<Iframe src="https://spiderspace.github.io/about" />
	</div>
</main>

<style>
	main {
		text-align: center;
		/* TODO should these be on `.column` ? */
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	img {
		width: 256px;
		height: 256px;
	}
	/* TODO */
	.portal {
		width: 380px;
		height: 180px;
		display: flex;
	}
</style>
