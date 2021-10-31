import type {Block} from '$lib/ui/block';
import {getContext, setContext} from 'svelte';
import type {Writable} from 'svelte/store';
import {writable} from 'svelte/store';
import {components} from '$lib/app/components';
import {defaultBlocks} from '$lib/app/blocks';
import {defaultProfiles} from '$lib/app/profiles';
import type {Profile} from '$lib/app/profiles';

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
	const profiles: Writable<Profile[]> = writable(defaultProfiles); // TODO use path?
	const selectedProfile: Writable<Profile> = writable(defaultProfiles[0]); // TODO use path?

	return {
		blocks,
		profiles,
		selectedProfile,
		components,
	};
};
