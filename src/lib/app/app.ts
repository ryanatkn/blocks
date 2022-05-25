import {getContext, setContext} from 'svelte';
import {writable, type Writable} from 'svelte/store';
import {compile} from 'svast-stringify';

import {defaultLayouts, type Layout} from '$lib/app/layouts';
import {defaultCode} from '$lib/app/defaultCode';
import {parseView, type ViewData} from '$lib/ui/view';

const KEY = Symbol();

export const setApp = (app: App): void => {
	setContext(KEY, app);
};

export const getApp = (): App => {
	return getContext(KEY);
};

export type App = ReturnType<typeof createApp>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createApp = () => {
	// const profiles: Writable<Profile[]> = writable(defaultProfiles);
	const layouts: Writable<Layout[]> = writable(defaultLayouts);
	const selectedLayout: Writable<Layout> = writable(defaultLayouts[0]);

	const viewCode = writable(defaultCode);
	const view = writable(parseView(defaultCode));

	const updateView = (updated: ViewData | string): void => {
		if (typeof updated === 'string') {
			viewCode.set(updated);
			view.set(parseView(updated));
		} else {
			view.set(updated);
			viewCode.set(compile(updated));
		}
	};

	return {
		// profiles,
		layouts,
		selectedLayout,
		viewCode,
		view,
		updateView,
	};
};
