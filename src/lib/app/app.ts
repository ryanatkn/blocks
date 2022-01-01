import {getContext, setContext} from 'svelte';
import {writable} from 'svelte/store';
import type {Writable} from 'svelte/store';

import type {Block} from '$lib/ui/block';
import {defaultBlocks, parseOptions} from '$lib/app/blocks';
import {defaultLayouts, type Layout} from '$lib/app/layouts';

const KEY = Symbol();

export const setApp = (app: App): void => {
	setContext(KEY, app);
};

export const getApp = (): App => {
	return getContext(KEY);
};

export type App = ReturnType<typeof createApp>;

export const createApp = () => {
	// TODO `block` that gets updated from the page store
	// TODO should probably be `Writable<Block>`?
	const blocks: Writable<Block[]> = writable(defaultBlocks);
	// const profiles: Writable<Profile[]> = writable(defaultProfiles); // TODO use path?
	const layouts: Writable<Layout[]> = writable(defaultLayouts); // TODO use path?
	const selectedLayout: Writable<Layout> = writable(defaultLayouts[0]); // TODO use path?

	return {
		blocks,
		// profiles,
		layouts,
		selectedLayout,
		parseOptions,
	};
};
