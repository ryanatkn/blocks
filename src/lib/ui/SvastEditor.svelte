<script lang="ts">
	import {createEventDispatcher} from 'svelte';

	import type {ViewData} from '$lib/ui/view';

	export let view: ViewData;
	export let viewCode: string;

	const dispatch = createEventDispatcher<{change: ViewData | string}>();

	$: viewStr = JSON.stringify(view, null, 2);
</script>

<div class="editor">
	<!-- <EditorNav {view} /> -->
	<!-- <nav>
		{#each $layouts as profile (profile)}
			<button
				class:selected={$selectedLayout === profile}
				on:click={() => ($selectedLayout = profile)}>{profile}</button
			>
		{/each}  </nav> -->
	<pre>
    <textarea
			value={viewCode}
			on:input={(e) => {
				dispatch('change', e.currentTarget.value);
			}}
		/>
    <textarea
			value={viewStr}
			on:input={(e) => {
				try {
					const parsed = JSON.parse(e.currentTarget.value);
					dispatch('change', parsed);
				} catch (err) {
					console.log(`err`, err);
					// TODO display the error
				}
			}}
		/>
  </pre>
</div>

<style>
	.editor {
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	pre {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	textarea {
		flex: 1;
	}
</style>
