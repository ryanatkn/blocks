<script lang="ts">
	import {EMPTY_OBJECT} from '@feltcoop/felt/util/object.js';
	import {getDevmode} from '@feltcoop/felt/ui/devmode.js';

	import {components} from '$lib/app/components';
	import {type ViewNode, toViewInfo} from '$lib/ui/view';

	export let view: ViewNode;

	const devmode = getDevmode();

	// TODO `toComponentViewProps` and `toElementViewProps`? or expand this API?
	// Maybe `toViewInfo` with optional allowlist of property names?
	// A simple allowlist is not enough: it needs the flexibility to, for example,
	// remove external links but preserve internal ones.
	// But should that be done upstream, before the properties are saved in the `view`,
	// through a `sanitize` helper that converts a parsed SVAST to a sanitized one?
	// Then this component wouldn't have to concern itself with security.
	$: ({props, directives} = toViewInfo(view) || EMPTY_OBJECT);

	// type MouseEventHandler = any; // TODO Svelte builtin?
	const toClickHandler = (e: MouseEvent): any => {
		if (!(directives && 'click' in directives)) {
			return undefined;
		}
		// TODO is there a Svelte bug that prevents `toClickHandler` being called inline? or is my brain broken?
		// return () => {
		console.log(`e`, e);
		e.stopPropagation();
		e.preventDefault();
		const handler = directives!.click; // TODO refactor
		if (handler === 'ToggleDevmode') {
			$devmode = !$devmode;
		} else {
			console.log('TODO handle', handler);
		}
		// };
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
		on:click={toClickHandler}
		>{#each view.children as child (child)}<svelte:self view={child} />{/each}</svelte:element
	>{:else if view.type === 'root'}{#each view.children as child (child)}<svelte:self
			view={child}
		/>{/each}{:else if view.type === 'text'}{view.value}{/if}
