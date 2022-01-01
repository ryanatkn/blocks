import {type SvelteComponent} from 'svelte';

import Iframe from '$lib/ui/Iframe.svelte';
import Column from '$lib/ui/Column.svelte';
import Dashboard from '$lib/ui/Dashboard.svelte';
import Grid from '$lib/ui/Grid.svelte';
import Background from '$lib/ui/Background.svelte';

export const components: Map<string, typeof SvelteComponent> = new Map(
	Object.entries({
		Iframe,
		Column,
		Dashboard,
		Grid,
		Background,
	}),
);
