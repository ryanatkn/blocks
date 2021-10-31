<script lang="ts">
	import BlockEditor from '$lib/ui/BlockEditor.svelte';
	import EditorNav from '$lib/ui/EditorNav.svelte';
	import type {Block} from '$lib/ui/block';
	import type {Writable} from 'svelte/store';
	import {writable} from 'svelte/store';
	import type {Profile} from '$lib/app/profiles';

	export let block: Block;
	export let blocks: Writable<Block[]>;
	export let selectedProfile: Writable<string>;
	export let profiles: Writable<Profile[]>;

	let view: Writable<'page' | 'app'> = writable('page');
</script>

<div class="editor">
	<EditorNav {view} />
	<nav>
		{#each $profiles as profile (profile)}
			<button
				class:selected={$selectedProfile === profile}
				on:click={() => ($selectedProfile = profile)}>{profile}</button
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
