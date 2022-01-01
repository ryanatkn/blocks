<script lang="ts">
	import {writable, type Writable} from 'svelte/store';

	import BlockEditor from '$lib/ui/BlockEditor.svelte';
	import EditorNav from '$lib/ui/EditorNav.svelte';
	import {type Block, type ParseBlockOptions} from '$lib/ui/block';
	import type {Layout} from '$lib/app/layouts';

	export let block: Block;
	export let blocks: Writable<Block[]>;
	export let selectedLayout: Writable<string>;
	export let layouts: Writable<Layout[]>;
	export let parseOptions: ParseBlockOptions;

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
	<pre>{JSON.stringify({...block, props: {blocks: `[${$blocks.length}]`}}, null, '	')}</pre>
	{#if $view === 'page'}
		<BlockEditor {blocks} {parseOptions} />
	{:else if $view === 'app'}
		...
	{:else}
		unhandled view: '{$view}'
	{/if}
</div>

<style>
	.editor {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
