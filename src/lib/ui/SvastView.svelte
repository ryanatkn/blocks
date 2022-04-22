<script lang="ts">
	import {EMPTY_OBJECT} from '@feltcoop/felt/util/object.js';
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';

	import {components} from '$lib/app/components';
	import {type ViewNode, toViewInfo} from '$lib/ui/view';

	export let view: ViewNode;

	const devmode = getDevmode();

	$: ({props, directives} = toViewInfo(view) || EMPTY_OBJECT);

	// type MouseEventHandler = any; // TODO Svelte builtin?
	const toClickHandler = (e: MouseEvent): any => {
		e.stopPropagation();
		e.preventDefault();
		const event = directives!.onClick; // TODO refactor
		if (event === 'ToggleDevmode') {
			$devmode = !$devmode;
		} else {
			// TODO how to pass params to events? inline JSON?
			console.log('TODO handle click with event system', event);
		}
	};
</script>

<!-- TODO is using keyed each blocks ideal here? maybe create an id for each node? -->
<!-- TODO should this render a fallback for unknown components? perhaps with a button to select a valid one? -->
{#if view.type === 'svelteComponent'}{#if components.has(view.tagName)}<svelte:component
			this={components.get(view.tagName)}
			{...props}
			>{#each view.children as child (child)}<svelte:self view={child} />{/each}</svelte:component
		>{:else}<div>
			unknown view: {view.tagName}
		</div>{/if}{:else if view.type === 'svelteElement'}<svelte:element
		this={view.tagName}
		{...props}
		on:click={directives && 'onClick' in directives ? toClickHandler : undefined}
		>{#each view.children as child (child)}<svelte:self view={child} />{/each}</svelte:element
	>{:else if view.type === 'root'}{#each view.children as child (child)}<svelte:self
			view={child}
		/>{/each}{:else if view.type === 'text'}{view.value}{/if}
