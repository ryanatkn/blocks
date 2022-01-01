<script lang="ts">
	import '@feltcoop/felt/ui/style.css';
	import '$lib/ui/style.css';
	import {createApp, setApp} from '$lib/app/app';
	import {setDevmode} from '@feltcoop/felt/ui/devmode.js';
	import Devmode from '@feltcoop/felt/ui/Devmode.svelte';
	// import FeltWindowHost from '@feltcoop/felt/ui/FeltWindowHost.svelte';

	const app = createApp();
	setApp(app);

	const devmode = setDevmode(import.meta.env.DEV);
</script>

<svelte:head>
	<title>spiderspace</title>
	<link rel="icon" href="/favicon.png" />
</svelte:head>

<slot />

<!-- <FeltWindowHost query={} /> -->

<Devmode {devmode} />
