<script lang="ts">
	import {slide} from 'svelte/transition';
	import type {Json} from '@feltcoop/felt/util/json.js';

	export let json: Json;
	export let keypath: string[];
	export let depth = 0;

	// TODO `export let` this like it was previously?
	const get_children = (item: Json): Json[] | null => {
		if (!item || typeof item !== 'object') return null;
		if (Array.isArray(item)) return item;
		return Object.entries(item).map(([key, value]) => ({key, value}));
	};

	console.log(`json, keypath`, json, keypath);

	let show_children = true;
	const toggle_show_children = (e: MouseEvent) => {
		// If `preventDefault` and `stopPropagation` are put on the event handler as modifiers,
		// it results in undesired UX, because we want to conditionally add the click handler and behavior.
		// We solve this problem with `get_children` above, which also seems like a hack.
		e.preventDefault();
		e.stopPropagation();
		show_children = !show_children;
	};

	$: children = get_children(json);
	$: clickable = !!children;
</script>

<div class="json" class:root={depth === 0} class:clickable transition:slide={{duration: 137}}>
	<div class="content">
		{#if clickable}
			<button class="icon" on:click={clickable ? toggle_show_children : undefined}>
				{#if show_children}
					–
				{:else}
					+
				{/if}
			</button>
		{:else}
			<span class="icon"> ∙ </span>
		{/if}
		{keypath + ''}
	</div>
	{#if children && show_children}
		{#each children as child (child)}
			<svelte:self json={child} depth={depth + 1} {get_children} />
		{/each}
	{/if}
</div>

<style>
	.json {
		border: 1px solid transparent;
		white-space: nowrap;
		padding-left: 30px;
	}
	.json.clickable:hover {
		border-color: rgba(10, 3, 4, 0.38);
		border-style: dashed;
	}
	.root {
		padding-left: 0;
	}
	.json.clickable:active {
		/* sadly I don't know how to make this NOT bubble without resorting to scripts,
		so it oddly affects ancestor branches. */
		border-color: rgba(10, 3, 4, 0.62);
		border-style: dotted;
	}
	.content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.icon {
		display: inline-block;
		flex-shrink: 0;
		width: 30px;
		text-align: center;
		font-size: 20px;
		line-height: 22px;
		height: 22px;
		padding: 0;
		margin: 0;
		background: none;
		border: none;
	}
	button:hover {
		background: #f0f0f0;
	}
	button:active {
		background: #d9d9d9;
	}
</style>
