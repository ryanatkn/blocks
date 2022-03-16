<script lang="ts">
	import '@feltcoop/felt/ui/style.css';
	import '$lib/ui/style.css';
	import {createApp, setApp} from '$lib/app/app';
	import {setDevmode} from '@feltcoop/felt/ui/devmode.js';
	import DevmodeControls from '@feltcoop/felt/ui/DevmodeControls.svelte';
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

<DevmodeControls {devmode} />
