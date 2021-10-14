<script lang="ts">
	// ...
</script>

<main class="column markup">
	<section>
		<h1 class="panel-inset">spiderspace</h1>
		<img class="pixelated" src="/favicon.png" />
	</section>
	<!-- TODO show spinner while iframe is loading -->
	<iframe class="panel-outset" src="https://spiderspace.github.io/about" />
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
	iframe {
		border: none;
		/* TODO hardcoding as a shortcut */
		width: 380px;
		height: 180px;
	}
</style>
