import type {SvelteComponent} from 'svelte';
import Iframe from '$lib/ui/Iframe.svelte';
import Column from '$lib/ui/Column.svelte';
import Dashboard from '$lib/ui/Dashboard.svelte';
import Grid from '$lib/ui/Grid.svelte';

export const components: Record<string, typeof SvelteComponent> = {Iframe, Column, Dashboard, Grid};
