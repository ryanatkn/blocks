<script lang="ts">
	import '@feltcoop/felt/ui/style.css';
	import '$lib/ui/style.css';
	import {createApp, setApp} from '$lib/app/app';
	import {setDevmode} from '@feltcoop/felt/ui/devmode.js';
	import DevmodeControls from '@feltcoop/felt/ui/DevmodeControls.svelte';
	import {base} from '$app/paths';
	// import FeltWindowHost from '@feltcoop/felt/ui/FeltWindowHost.svelte';

	const app = createApp();
	setApp(app);

	const devmode = setDevmode(import.meta.env.DEV);
</script>

<svelte:head>
	<title>spiderspace: blocks</title>
	<link rel="icon" href="{base}/favicon.png" />
</svelte:head>

<slot />

<!-- <FeltWindowHost query={} /> -->

<DevmodeControls {devmode} />
