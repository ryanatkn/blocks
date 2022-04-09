<script lang="ts">
	import {getApp} from '$lib/app/app';
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';
	import type {Block, ElementBlock} from '$lib/ui/block';
	import BlockViewChildren from '$lib/ui/BlockViewChildren.svelte';

	const {parseOptions} = getApp();

	export let block: Block;

	const devmode = getDevmode();

	const toClickHandler =
		(block: ElementBlock): any =>
		(e: MouseEvent) => {
			// TODO probably replace this with a declarative event system, maybe like:
			// `dispatch(block.onClick.name, block.onClick.params)`
			if (block.onClick!.name === 'ToggleDevmode') {
				$devmode = !$devmode;
			} else {
				console.log('handle button click', e, block.onClick);
			}
		};
</script>

<!-- TODO consider passing `{block}` to components -->

{#if block.type === 'Component'}<svelte:component
		this={parseOptions.components.get(block.component)}
		{...block.props}
	/>{:else if block.type === 'Text'}{block.content}{:else if block.type === 'Element'}<svelte:element
		this={block.element}
		{...block.attributes}
		data-entity={block.id}
		on:click={block.onClick ? toClickHandler(block) : undefined}
	>
		<BlockViewChildren {block} />
	</svelte:element>{/if}
