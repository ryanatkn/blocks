<script lang="ts">
	import type {ViewData} from '$lib/ui/view';

	export let view: ViewData;
	export let viewCode: string;

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
				console.log('code changed', e.currentTarget.value.length);
			}}
		/>
    <textarea
			value={viewStr}
			on:input={(e) => {
				console.log('json changed', e.currentTarget.value.length);
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
