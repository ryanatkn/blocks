<script lang="ts">
	import '@feltcoop/felt/ui/style.css';
	import '$lib/ui/style.css';
	import {createApp, setApp} from '$lib/app/app';

	const app = createApp();
	setApp(app);
</script>

<svelte:head>
	<title>spiderspace</title>
	<link rel="icon" href="/favicon.png" />
</svelte:head>

<slot />
