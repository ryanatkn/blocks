<script lang="ts">
	import '@feltcoop/felt/ui/style.css';
	import '$lib/ui/style.css';
	import {createApp, setApp} from '$lib/app/app';
	import {setDevmode} from '@feltcoop/felt/ui/devmode.js';
	import Devmode from '@feltcoop/felt/ui/Devmode.svelte';
	import {dev} from '$app/env';

	const app = createApp();
	setApp(app);

	const devmode = setDevmode(import.meta.env.DEV);

	// For security, we're locking things down
	// with a strict Content-Security-Policy until we add sanitization:
	// for more: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
	const trustedHosts = "'self' https://www.spiderspace.org/ https://spiderspace.github.io/";
	const unsafe = dev;
	const csp = [
		`default-src ${trustedHosts}`,
		`connect-src ${trustedHosts}`,
		`script-src ${trustedHosts}${unsafe ? " 'unsafe-inline'" : ''}`,
		`style-src ${trustedHosts}${unsafe ? " 'unsafe-inline'" : ''}`,
	];
</script>

<svelte:head>
	<title>spiderspace</title>
	<link rel="icon" href="/favicon.png" />
	<meta http-equiv="Content-Security-Policy" content={csp.join('; ')} />
</svelte:head>

<slot />

<Devmode {devmode} />
