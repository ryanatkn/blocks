<script lang="ts">
	import {type Writable} from 'svelte/store';
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';

	const devmode = getDevmode();

	// TODO make this generic

	export let view: Writable<'page' | 'app'>;
</script>

<nav>
	<button class:selected={$view === 'page'} on:click={() => ($view = 'page')}>page</button>
	<button class:selected={$view === 'app'} on:click={() => ($view = 'app')}>app</button>

	<button on:click={() => ($devmode = !$devmode)}>✕</button>
</nav>

<style>
</style>
