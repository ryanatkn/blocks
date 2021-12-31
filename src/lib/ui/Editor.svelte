<script lang="ts">
	import BlockEditor from '$lib/ui/BlockEditor.svelte';
	import EditorNav from '$lib/ui/EditorNav.svelte';
	import type {Block} from '$lib/ui/block';
	import type {Writable} from 'svelte/store';
	import {writable} from 'svelte/store';
	import type {Layout} from '$lib/app/layouts';

	export let block: Block;
	export let blocks: Writable<Block[]>;
	export let selectedLayout: Writable<string>;
	export let layouts: Writable<Layout[]>;

	let view: Writable<'page' | 'app'> = writable('page');
</script>

<div class="editor">
	<EditorNav {view} />
	<nav>
		{#each $layouts as profile (profile)}
			<button
				class:selected={$selectedLayout === profile}
				on:click={() => ($selectedLayout = profile)}>{profile}</button
			>
		{/each}
	</nav>
	<pre>{JSON.stringify({...block, props: {blocks: `[${$blocks.length}]`}}, null, 2)}</pre>
	{#if $view === 'page'}
		<BlockEditor {blocks} />
	{:else if $view === 'app'}
		...
	{:else}
		unhandled view: '{$view}'
	{/if}
</div>
