<script lang="ts">
	import BlockEditor from '$lib/ui/BlockEditor.svelte';
	import EditorNav from '$lib/ui/EditorNav.svelte';
	import type {Block} from '$lib/ui/block';
	import type {Writable} from 'svelte/store';
	import {writable} from 'svelte/store';

	export let block: Block;
	export let selectedBlockKey: Writable<string>;

	let view: Writable<'page' | 'app'> = writable('page');
</script>

<div class="editor">
	<EditorNav {view} />
	<nav>
		<button class:selected={$selectedBlockKey === '/'} on:click={() => ($selectedBlockKey = '/')}
			>Column</button
		>
		<button class:selected={$selectedBlockKey === '2'} on:click={() => ($selectedBlockKey = '2')}
			>Dashboard</button
		>
		<button class:selected={$selectedBlockKey === '3'} on:click={() => ($selectedBlockKey = '3')}
			>Grid</button
		>
	</nav>
	{#if $view === 'page'}
		<BlockEditor {block} blockKey={$selectedBlockKey} />
	{:else if $view === 'app'}
		...
	{:else}
		unhandled view: '{$view}'
	{/if}
</div>
