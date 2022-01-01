<script lang="ts">
	import {fly} from 'svelte/transition';

	import {type Block} from '$lib/ui/block';

	export let block: Block;

	const onInput = (e: Event) => {
		// TODO dispatch event? use immer to change immutably
		// store dispatch pattern?
		const src = (e as any).target.value;
		dispatch('SetBlockProps', {block: block.id, props: {src}}); // TODO name ? `block_id`?
	};
</script>

<div class="controls panel-inset" transition:fly|local={{y: 25, duration: 500}}>
	<!-- TODO generic component -->
	{#if block.type === 'Component' && block.component === 'Iframe'}
		<input value={block.props.src} on:input={onInput} />
		<a href={block.props.src}>🔗</a>
	{:else}
		<code>TODO</code> controls
	{/if}
</div>

<style>
	.controls {
		text-align: center;
		height: var(--nav_height);
		position: absolute;
		left: 0;
		top: calc(var(--nav_height) * -1);
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	a {
		font-size: var(--font_size_xl);
		padding: 0 var(--spacing_sm);
	}
	input {
		margin: 0;
	}
</style>
