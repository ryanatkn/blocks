<script lang="ts">
	import BlockEditor from '$lib/ui/BlockEditor.svelte';
	import EditorNav from '$lib/ui/EditorNav.svelte';
	import type {Block} from '$lib/ui/block';
	import type {Writable} from 'svelte/store';
	import {writable} from 'svelte/store';

	export let block: Block;

	let view: Writable<'page' | 'app'> = writable('page');
</script>

<div class="editor">
	<EditorNav {view} />
	{#if $view === 'page'}
		<BlockEditor {block} />
	{:else if $view === 'app'}
		TODO present at least 3 layouts (blocks) that can be clicked to activate
	{:else}
		unhandled view: '{$view}'
	{/if}
</div>
