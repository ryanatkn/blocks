// TODO can't run tests because of Svelte imports in the sibling module,
// fix that and then delete this module

export const components: Map<string, null> = new Map(
	Object.entries({
		Iframe: null,
		Column: null,
		Dashboard: null,
		Grid: null,
		Background: null,
	}),
);
