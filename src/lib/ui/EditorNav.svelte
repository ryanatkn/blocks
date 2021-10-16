<script lang="ts">
	import type {Writable} from 'svelte/store';

	// TODO make this generic

	export let view: Writable<'page' | 'app'>;
</script>

<nav>
	<button class:selected={$view === 'page'} on:click={() => ($view = 'page')}>page</button>
	<button class:selected={$view === 'app'} on:click={() => ($view = 'app')}>app</button>
</nav>

<style>
</style>
